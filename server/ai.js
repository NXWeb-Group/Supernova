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
  const messages = `role: system content: Markdown optional role: user content: ${text};`;
  const Token = enc.encode(messages).length * 20;
  if (data.tokens >= Token) return Token;
  else return -1;
}

async function removeTokens(accid, usedToken) {
  const updateResult = await account.findOneAndUpdate(
    { _id: new ObjectId(String(accid)) },
    { $inc: { tokens: -usedToken } },
    { returnDocument: "after", projection: { tokens: 1 } }
  );
  return updateResult.tokens;
}

async function storeInDB(accid, roomid, chats) {
  if (roomid === null) {
    roomid = new ObjectId();
    await account.updateOne(
      { _id: new ObjectId(String(accid)) },
      {
        $push: {
          rooms: { roomid: roomid, name: "Unnamed Room", chats: chats },
        },
      }
    );
    return roomid;
  } else {
    await account.updateOne(
      { _id: new ObjectId(String(accid)), "rooms.roomid": new ObjectId(String(roomid)) },
      { $push: { "rooms.$.chats": { $each: chats } } }
    );
    return false;
  }
}

export async function ask(req, res) {
  const tokens = await validateTokens(req.session.userid, req.body.text);
  console.log(tokens);
  if (tokens > -1) {
    const remainingTokens = await removeTokens(req.session.userid, tokens);
    let chat = [{ ai: false, text: req.body.text }];
    // res.send({ message: { content: req.body.text }, error: false });

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Markdown optional",
        },
        {
          role: "user",
          content: req.body.text,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: tokens + 600,
    });
    chat.push({ ai: true, text: completion.choices[0].message.content });
    const roomid = await storeInDB(req.session.userid, req.body.roomid, chat);
    res.send({
      message: completion.choices[0].message.content,
      remainingTokens: remainingTokens,
      roomid: roomid,
      error: false,
    });
    console.log(completion);
  } else {
    res.send({ error: "Not Enough Tokens" });
  }
}

export async function getChats(req, res) {
  const accountData = await account.findOne(
    {
      _id: new ObjectId(String(req.session.userid)),
      "rooms.roomid": new ObjectId(String(req.body.roomid)),
    },
    { projection: { "rooms.$": 1 } }
  );
  res.send(accountData.rooms[0]);
}
