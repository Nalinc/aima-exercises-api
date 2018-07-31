const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
var chapter_map = require('./chapter_map')
const httprequest = require('request')
const app = express();
const search = require('./search')
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.get('/search/',search.searchController)

app.get('/rating/:chapterID',(request,response) => {
	obj = {
	  "id": new Date().getTime(),
	  "exercise": request.params.exerciseID,
	  "chapter": request.params.chapterID,
	  "rating": 0,
	  "success": true
	}
	var docRef = db.collection('rating').doc(obj["chapter"]);
	var getDoc = docRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        response.send(doc.data());
      }
      return
    })
    .catch(err => {
      console.log('Error getting document', err);
      response.send("ERROR");
    });
})

app.get('/rating/:chapterID/:exerciseID',(request,response) => {
	obj = {
	  "id": new Date().getTime(),
	  "exercise": request.params.exerciseID,
	  "chapter": request.params.chapterID,
	  "rating": 0,
	  "success": true
	}
	var docRef = db.collection('rating').doc(obj["chapter"]);
	var getDoc = docRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        response.send('No such document!');
      } else {
        obj["rating"]=doc.data()[obj["exercise"]] || 0
        response.send(obj);
      }
      return
    })
    .catch(err => {
      console.log('Error getting document', err);
      response.send("ERROR");
    });
})

app.post('/rating/:chapterID/:exerciseID',(request,response) => {
	obj = {
	  "id": new Date().getTime(),
	  "exercise": request.params.exerciseID,
	  "chapter": request.params.chapterID,
	  "rating": 0,
	  "success": true
	}
	var docRef = db.collection('rating').doc(obj["chapter"]);
	var getDoc = docRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        response.send('No such document!');
      } else {
      	o = doc.data()
      	if(o[obj["exercise"]]){
      		o[obj["exercise"]]+=1
      	}else{
  			o[obj["exercise"]] = 1
      	}
      	docRef.set(o).then(()=>{
      		obj["rating"] = o[obj["exercise"]]
      		response.send(obj);
      		return
      	}).catch(err => {
	      console.log('Error writing document', err);
	      response.send("ERROR");
	    });
        // obj["rating"]=doc.data()[obj["exercise"]] || 0
        // response.send(obj);
      }
      return
    })
    .catch(err => {
      console.log('Error getting document', err);
      response.send("ERROR");
    });
})

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
