var provider = new firebase.auth.GoogleAuthProvider();


  var userId = ""

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
    console.log("logOUT")
    location.reload();
  }).catch(function(error) {
    // An error happened.
    alert(error)
  });
}

firebase.auth().onAuthStateChanged(function(user) {
    window.user = user; // user is undefined if no user signed in
    if(user != null){
      $('.user').html(`
      <div class="loginName"></div>
      <div class="loginImg"> <img src="${window.user.photoURL}" title="${window.user.displayName}"></div>
      <div class="logout"><i class="fa fa-sign-out" aria-hidden="true"></i>Salir
      </div>
      `)
    }else{
        $('.user').html(`
         <div id="login"><i class="fa fa-sign-in" aria-hidden="true"></i> Entrar
         </div>
        `)
      }
    
   })

