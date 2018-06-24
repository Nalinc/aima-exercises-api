const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/chapter/:chapterID',(request,response) => {
	response.send("Hello world");
})

app.delete('/chapter/:chapterID',(request,response) => {
	response.send("Hello world");
})

app.post('/chapter/:chapterID/exercise/:exerciseID',(request,response) => {
	response.send("Hello world");
})

app.get('/hello',(request,response) => {
	response.send("Hello world");
})

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
