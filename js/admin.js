const adminApp = () => {
  firebase.initializeApp(firebaseConfig);

  let user = null;

  const submitButton = document.querySelector("#submit");

  const emailInput = document.querySelector("#user_email");

  const passwordInput = document.querySelector("#user_password");

  const messages = document.querySelector("#messages");

  const loader = document.querySelector("#loader");

  const loginForm = document.querySelector("#login-form");

  const loginSection = document.querySelector("#login-section");

  const adminSection = document.querySelector("#admin-section");

  const logoutBtn = document.querySelector("#logout");

  logoutBtn.addEventListener("click", function(event){
      event.preventDefault();

      document.getElementById("errormsg_ap").innerHTML = `
            <div class="alert alert-success">Signing out....</div>
        `;

      firebase.auth().signOut().then(() => {
        user = null;
      }).then(() => {
          window.location.reload();
      })
      .catch((error) => {
          document.getElementById("errormsg_ap").innerHTML  = `
            <div class="alert alert-danger">Failed to sign in due to : ${error}</div>
          `;
      });
  });

  const getContactDataElements = (collection, itemsRef) => {
      return firebase.firestore().collection(collection).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(data);  
            itemsRef.innerHTML += `
                <tr>
                    <td>${doc.id}</td>
                    <td>${data.name}</td>
                    <td>${data.email}</td>
                    <td>${data.phoneNumber}</td>
                    <td>${data.country}</td>
                    <td>${data.subject}</td>
                    <td>${data.message}</td>
                </tr>
              `;
          })
      })
  }

  const getCareerDataElements = (collection, itemsRef) => {
    return firebase.firestore().collection(collection).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data);  
          itemsRef.innerHTML += `
              <tr>
                  <td>${doc.id}</td>
                  <td>${data.name}</td>
                  <td>${data.email}</td>
                  <td>${data.phoneNumber}</td>
                  <td><a href="">View File</a></td>
              </tr>
            `;
        })
    })
}

  const loadDocuments = () => {
    
    const contactUsRef = document.getElementById("contactus_tabledata");

    const careerDataRef = document.getElementById("careerdata_tabledata");
    
    getContactDataElements("contactus", contactUsRef);

    getCareerDataElements("career", careerDataRef);

    
  }

  const loginUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;
        console.log("Logged in as : ", user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        messages.innerHTML = `
            <div class="alert alert-danger" role="alert">
                ${errorCode}
            </div>
        `;
      });
  };

  submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    loader.classList.remove("hide");

    loginForm.checkValidity();

    const email = emailInput.value;
    const password = passwordInput.value;

    if (password !== "" && email !== "") {
      loginUser(email, password);
    } else {
      messages.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Credentials are required!!
            </div>
          `;
    }
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
      loginSection.classList.add("hide");
      adminSection.classList.remove("hide");
      loadDocuments();

    } else {
      // User is signed out
      // ...
      loginSection.classList.remove("hide");
      adminSection.classList.add("hide");
    }
  });

};

adminApp();
