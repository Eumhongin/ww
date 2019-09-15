var firebaseConfig = {
    apiKey: "AIzaSyAI05vAIQyXxoInyjMljxe89QMnr2zAYAA",
    authDomain: "workflow-9e1eb.firebaseapp.com",
    databaseURL: "https://workflow-9e1eb.firebaseio.com",
    projectId: "workflow-9e1eb",
    storageBucket: "workflow-9e1eb.appspot.com",
    messagingSenderId: "244876828920",
    appId: "1:244876828920:web:1ff838236786cf1285db0d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.firestore()
var auth = firebase.auth()