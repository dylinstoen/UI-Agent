const express = require('express');
const bodyParser = require('body-parser');
const OpenAIApi = require('openai');
const crypto = require('crypto');
const cors = require('cors');

require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('absolute\\path\\to\\ui-agent')); // Serve the frontend
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type'], // Allow these headers
  }));
const openai = new OpenAIApi({
    apiKey: OPENAI_API_KEY
});

const sessionMemory = {};

app.post('/chat', async (req, res) => {
    let { sessionId, question } = req.body;

    if (!sessionId) {
        sessionId = crypto.randomUUID();
    }

    // Initialize session memory if it doesn't exist
    if (!sessionMemory[sessionId]) {
        sessionMemory[sessionId] = [
            { role: 'system', content: 'You are a financial assistant chatbot.' }
        ];
    }

    sessionMemory[sessionId].push({ role: 'user', content: question });

    console.log(sessionMemory[sessionId])

    try {
        const completion = await  await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: sessionMemory[sessionId],
        });
        
        const answer = completion.choices[0].message.content;

        sessionMemory[sessionId].push({ role: 'assistant', content: answer });

        res.json({ answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch response.' });
    }
    console.log(sessionMemory)
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));