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

const contactUsFormUpload = () => {

  const saveButton = document.getElementById("submitBtn");

  console.log(saveButton);

  const firestoreRef = firebase.firestore();

  saveButton.addEventListener('click', function(event){

    event.preventDefault();

    const name = document.getElementById("user_name").value === "" ? null : document.getElementById("user_name").value;
    const email = document.getElementById("user_email").value === "" ? null :  document.getElementById("user_email").value;
    const phoneNumber = document.getElementById("user_phone").value === "" ? null : document.getElementById("user_phone").value;
    const country = document.getElementById("user_country").value === "" ? null : document.getElementById("user_country").value;
    const subject = document.getElementById("user_subject").value === "" ? null : document.getElementById("user_subject").value;
    const message = document.getElementById("user_message").value === "" ? null : document.getElementById("user_message").value;
    const messageLog = document.getElementById("messages");

    if(name && email && phoneNumber && country && subject && message){
      this.innerHTML = `<p class="fs-6">Loading... Please wait!!</p>`;

    const data = {
      name,
      email,
      phoneNumber,
      country,
      message,
      subject,
    };
    
    const docRef = firestoreRef.doc(`contactus/${getDateTime()}`);
    docRef
      .set(data)
      .then(() => {
        console.log("Successfully Submitted!!");
        messageLog.innerHTML += `
                    <div class="alert alert-success" role="alert">
                        Successfully submitted!!
                    </div>
                    `;
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 100)
      })
      .catch(function (error) {
        console.log(`Got an error : ${error}`);
        messageLog.innerHTML += `
                <div class="alert alert-danger" role="alert">
                    An error occured while submitting! ${err}
                </div>
          `;
      });
    }else{
      messageLog.innerHTML = `
        <div class="alert alert-danger" role="alert">
            All Fields are required!!
        </div>
      `;
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  })

};

function app() {
  firebase.initializeApp(firebaseConfig);
  contactUsFormUpload();
}

app();
