const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateQuestionsWithAI = async (topic, difficulty = 'medium', count = 5) => {
  try {
    const prompt = `Generate ${count} multiple choice quiz questions about "${topic}" with difficulty level "${difficulty}".
    
    Return the response as a JSON array with the following structure for each question:
    {
      "text": "Question text here?",
      "type": "multiple_choice",
      "options": [
        {"text": "Option A", "isCorrect": true},
        {"text": "Option B", "isCorrect": false},
        {"text": "Option C", "isCorrect": false},
        {"text": "Option D", "isCorrect": false}
      ],
      "correctAnswer": "Option A",
      "explanation": "Explanation of why this is correct",
      "difficulty": "${difficulty}"
    }
    
    Only return valid JSON array, no additional text.`;

    const message = await openai.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const responseText = message.content[0].text;
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    
    if (!jsonMatch) {
      throw new Error('Could not parse AI response');
    }

    const questions = JSON.parse(jsonMatch[0]);
    return questions;
  } catch (error) {
    console.error('AI Error:', error);
    throw new Error(`Failed to generate questions: ${error.message}`);
  }
};

module.exports = { generateQuestionsWithAI };
