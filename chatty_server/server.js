// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function assignColor() {
    const colors = ['#ff0000', '#0000ff', '#008000', '#000000']; //red, blue, green, black
    const color = colors[Math.floor(Math.random() * colors.length)];
    return color;
}

function imageCheck(content) {
    const imgRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/gi;
    let newContent = [];
    let images = [];
    let imgUrl = [];
    while ((imgUrl = imgRegex.exec(content)) !== null) {
        images.push({ url: imgUrl[0], index: imgUrl.index })
    }
    if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
            const subStrStart = images[i - 1] ? images[i - 1].index + images[i - 1].url.length : 0;
            newContent.push({ type: 'text', content: content.substring(subStrStart, images[i].index) })
            newContent.push({ type: 'image', content: images[i].url });
        }
        newContent.push({ type: 'text', content: content.substring(images[images.length - 1].index + images[images.length - 1].url.length) });
    } else {
        newContent.push({ type: 'text', content });
    }
    return newContent;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');
    const connectedResponse = { userCount: wss.clients.size, color: assignColor() };
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
            const message = {
                type: 'incomingNotification',
                content: 'A new user has joined the chat.'
            };

            const response = { userCount: wss.clients.size, message };
            console.log('Sending message to all clients');
            client.send(JSON.stringify(response));
        }
    })
    ws.send(JSON.stringify(connectedResponse));
    ws.on('message', (messageJSON) => {
        const message = JSON.parse(messageJSON);
        message.id = uuid();
        message.content = imageCheck(message.content);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                const response = { userCount: wss.clients.size, message };
                console.log('Sending message to all clients');
                client.send(JSON.stringify(response));
            }
        })
    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));
});