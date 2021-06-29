const getDateTime = () => {
  var currentdate = new Date();
  return (
    currentdate.getDate() +
    "|" +
    (currentdate.getMonth() + 1) +
    "|" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds()
  );
};


const fileUploadRef = document.getElementById("myFile");
const messageLog = document.getElementById("messages");

let fileName = "";

fileUploadRef.addEventListener("change", function (e) {
    e.preventDefault();

    var file = e.target.files[0];

    fileName = `resumes/${file.name}`;

    var storageRef = firebase.storage().ref(fileName);

    var task = storageRef.put(file);


    task.on(
        "state_changed",
        function progress(snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
          messageLog.innerHTML = `
            <div class="progress my-2">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${percentage}%;" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100">${percentage}%</div>
          </div>
            `;
        },
        function error(err) {
          console.log(`Couldn't Upload File Due to : ${err}`);
          messageLog.innerHTML += `
                <div class="alert alert-danger" role="alert">
                    An error occured while submitting! ${err}
                </div>
          `;
        },
        function complete() {
          console.log("SUCCESSFULLY SUBMITTED FILE!!");
        }
      );
  

});

const careerFormUpload = () => {
  const saveButton = document.querySelector("#submit");

  const firestoreRef = firebase.firestore();

  saveButton.addEventListener("click", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("mobile").value;

      const data = {
        name,
        email,
        phoneNumber,
        fileName,
      };

      const docRef = firestoreRef.doc(`career/${getDateTime()}`);
      docRef
        .set(data)
        .then(function () {
          console.log("Successfully Submitted!!");
          messageLog.innerHTML += `
                    <div class="alert alert-success" role="alert">
                        File uploaded successfully!!
                    </div>
                    `;
        })
        .catch(function (error) {
          console.log(`Got an error : ${error}`);
        });
      
  });
};

function app() {
  const firebaseConfig = {
    apiKey: "AIzaSyBy65eQnSEcaiYZXdMkS5YZL-oojTmZuhU",
    authDomain: "service-tracker-665ef.firebaseapp.com",
    projectId: "service-tracker-665ef",
    storageBucket: "service-tracker-665ef.appspot.com",
    messagingSenderId: "489936846435",
    appId: "1:489936846435:web:117314c7a255da467ac256",
    measurementId: "G-4FCXYN4PH0",
  };
  firebase.initializeApp(firebaseConfig);
  careerFormUpload();
}

app();
