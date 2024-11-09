import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function ask(req, res){
  // res.send({message: {content: req.body.text}})
  const completion = await client.chat.completions.create({
    messages: [{ role: 'user', content: `Markdown: ${req.body.text}` }],
    model: 'gpt-4o-mini',
  });
  res.send({message: completion.choices[0].message, tokens: completion.usage.total_tokens});
  console.log(completion);
}