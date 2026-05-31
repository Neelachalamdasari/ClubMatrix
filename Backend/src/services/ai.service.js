const Groq = require("groq-sdk");

const groq = new Groq({

  apiKey:
    process.env.GROQ_API_KEY

});

exports.askAI = async (prompt) => {

  try {

    const response =
      await groq.chat.completions.create({

        model:
          "llama-3.3-70b-versatile",

        messages: [

          {

            role: "system",

            content:
              "You are an AI assistant for a college club collaboration platform."

          },

          {

            role: "user",

            content: prompt

          }

        ]

      });

    return response.choices[0]
      .message.content;

  } catch (error) {

    console.log(error);

    throw error;

  }








};