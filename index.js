const {NlpManager} = require('node-nlp');
const express = require('express');
const manager = new NlpManager(({languages: ['en']}));
const app = express();

manager.addDocument('en', 'hello', 'greeting');
manager.addDocument('en', 'hey', 'greeting');
manager.addDocument('en', 'hi', 'greeting');
manager.addDocument('en', 'good morning', 'greeting');
manager.addDocument('en', 'good afternoon', 'greeting');
manager.addDocument('en', 'good evening', 'greeting');
manager.addDocument('en', 'yo', 'greeting');
manager.addDocument('en', 'whats up', 'greeting');

manager.addAnswer('en', 'greeting', 'Hi!');
manager.addAnswer('en', 'greeting', 'Hey!');
manager.addAnswer('en', 'greeting', 'Yes!');
manager.addAnswer('en', 'greeting', 'Yo Whats up!');
manager.addAnswer('en', 'greeting', 'Yes, How can i help you?');

manager.train().then(async () => {
    manager.save();
    app.get('/bot', async (req, res) => {
        let response = await manager.process('en', req.query.message);
        res.send(response.answer || 'Sorry I dont know');
    })
    app.listen(5000);
})