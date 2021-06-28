
const getDateTime = () => {
    var currentdate = new Date(); 
    return (currentdate.getDate() + "|"
    + (currentdate.getMonth()+1)  + "|" 
    + currentdate.getFullYear() + " @ "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds());   
}


const contactUsFormUpload = () => {
    
    const saveButton = document.querySelector("#submit");

    const firestoreRef = firebase.firestore();


    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        const name = document.getElementById("user_name").value;
        const email = document.getElementById("user_email").value;
        const phoneNumber = document.getElementById("user_phone").value;
        const country = document.getElementById("user_country").value;
        const subject = document.getElementById("user_subject").value;
        const message = document.getElementById("user_message").value;
        const data = {
            name, email, phoneNumber, country, message, subject
        }
        const docRef = firestoreRef.doc(`contactus/${getDateTime()}`);
        docRef.set(data).then(function(){
            console.log("Successfully Submitted!!");
        }).catch(function(error){
            console.log(`Got an error : ${error}`);
        }); 
    });
}


function app(){
    const firebaseConfig = {
        apiKey: "AIzaSyBy65eQnSEcaiYZXdMkS5YZL-oojTmZuhU",
        authDomain: "service-tracker-665ef.firebaseapp.com",
        projectId: "service-tracker-665ef",
        storageBucket: "service-tracker-665ef.appspot.com",
        messagingSenderId: "489936846435",
        appId: "1:489936846435:web:117314c7a255da467ac256",
        measurementId: "G-4FCXYN4PH0"
    };
    firebase.initializeApp(firebaseConfig);     
    contactUsFormUpload();
}

app();