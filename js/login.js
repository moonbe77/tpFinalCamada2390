var provider = new firebase.auth.GoogleAuthProvider();


  

var login = function (params) {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  }); 
}

var logout = function (params) {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    alert("logOUT")
  }).catch(function(error) {
    // An error happened.
  });
}

firebase.auth().onAuthStateChanged(function(user) {
    window.user = user; // user is undefined if no user signed in
    $('.user').text(window.user.displayName)
   });

