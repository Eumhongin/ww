const functions = require('firebase-functions');
const firebase = require('firebase')
const express = require('express');

const app = express();
var firebaseConfig = {
 apiKey: "AIzaSyAI05vAIQyXxoInyjMljxe89QMnr2zAYAA",
 authDomain: "workflow-9e1eb.firebaseapp.com",
 databaseURL: "https://workflow-9e1eb.firebaseio.com",
 projectId: "workflow-9e1eb",
 storageBucket: "workflow-9e1eb.appspot.com",
 messagingSenderId: "244876828920",
 appId: "1:244876828920:web:1ff838236786cf1285db0d"
};
firebase.initializeApp(firebaseConfig)
// const router = express.Router()

app.get('/helloworld',(req,res,next) => {
 
 firebase.firestore().collection('users').doc('cocosdsdco').set({
  first : 'hellowlrld'
 }).then((docRef)=>{
  res.json({
   msg: docRef.id
  })
 })
 
})

exports.api = functions.https.onRequest(app);
