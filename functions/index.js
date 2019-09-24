const functions = require('firebase-functions');

const express = require('express');
const firebase = require("firebase-admin");


var serviceAccount = require("./workflow-9e1eb-firebase-adminsdk-6sht8-9081c58c39.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://workflow-9e1eb.firebaseio.com"
});

const db = firebase.firestore();
const Auth = firebase.auth()
// console.log(Auth)
const app = express();

// const router = express.Router()

app.post('/createUser',(req,res,next) => {
    let loginObject = {
        email : req.body.email,
        password : req.body.password,
        name : req.body.name
    }
    // console.log(loginObject.email)
    // console.log(loginObject.password)
    Auth.createUserWithEmailAndPassword(loginObject.email, loginObject.password).then((user) => {
    //  console.log(user)
     // db.collection('users').docs().add(loginObject)
     // auth.onStateChanged((user) => {
     //  console.log(user.email)
     // })
    }).then((user)=>{
    //  console.log(user)
    })
    // next()

 
})

app.get('/message',(req,res,next) => {
    res.json({
        msg : "helloworld!!!"
    })
})

exports.api = functions.https.onRequest(app);
