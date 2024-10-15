const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// OpenAI configuration
const configuration = new Configuration({
    apiKey: 'API Key', // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

// WebSocket connection handler
wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
        console.log('Received:', message);

        // Call OpenAI API (ChatGPT)
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [{ role: 'user', content: message }],
        });

        // Send response back to the client
        const botMessage = response.data.choices[0].message.content;
        ws.send(botMessage);
    });
});

// Start the server
server.listen(8081, () => {
    console.log('Server is listening on port 8081');
});