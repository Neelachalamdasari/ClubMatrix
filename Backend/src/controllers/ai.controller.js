const {

  askAI

} = require(
  "../services/ai.service"
);

exports.askAssistant =
async (req, res) => {

  try {

    const { prompt } = req.body;

    const reply =
      await askAI(prompt);

    res.status(200).json({

      success: true,

      reply

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};