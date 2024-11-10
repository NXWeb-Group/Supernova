import OpenAI from "openai";
import { encodingForModel } from "js-tiktoken";
import { ObjectId } from "mongodb";
import { account } from "./mongo.js";

const enc = encodingForModel("gpt-4o-mini");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function validateTokens(accid, text) {
  const data = await account.findOne(
    { _id: new ObjectId(String(accid)) },
    { projection: { tokens: 1 } }
  );
  const messages = `role: system content: Markdown optional role: user content: ${text};`
  const estToken = enc.encode(messages).length;
  if (data.tokens >= estToken) return true;
  else return false;
}

async function removetokens(accid, usedTokens) {
  const updateResult = await account.findOneAndUpdate(
    { _id: new ObjectId(String(accid)) },
    { $inc: { tokens: -usedTokens } },
    { returnDocument: "after", projection: { tokens: 1 } }
  );
  return updateResult.tokens;
}

export async function ask(req, res) {
  const text = req.body.text;
  const session = req.session;
  if (await validateTokens(session.userid, text)) {
    // res.send({ message: { content: text }, error: false });

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Markdown optional",
        },
        {
          role: "user",
          content: text,
        },
      ],
      model: "gpt-4o-mini",
    });
    const remTokens = await removetokens(
      session.userid,
      completion.usage.total_tokens
    );
    res.send({
      message: completion.choices[0].message,
      remainingTokens: remTokens,
      error: false,
    });
    console.log(completion);
  } else {
    res.send({ error: "Not Enough Tokens" });
  }
}