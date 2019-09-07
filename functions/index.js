const functions = require('firebase-functions');

const express = require('express');
const firebase = require("firebase-admin");

var serviceAccount = require("./workflow-9e1eb-firebase-adminsdk-6sht8-9081c58c39.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://workflow-9e1eb.firebaseio.com"
});
const db = firebase.firestore();
const auth = firebase.auth()
const app = express();

// const router = express.Router()

app.post('/createUser',(req,res,next) => {
    let loginObject = {
        email : req.body.email,
        password : req.body.password,
        name : req.body.name
    }
    auth.createUserWithEmailAndPassword(loginObject.email,loginObject.password).then(() => {

    })
    db.collection('users').add(loginObject)

 
})

exports.api = functions.https.onRequest(app);
