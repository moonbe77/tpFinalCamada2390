var provider = new firebase.auth.GoogleAuthProvider();


var login = function (params) {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    user = result.user;
    location.reload();
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

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;




firebase.auth().onAuthStateChanged(function(user) {
  if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}
    window.user = user; // user is undefined if no user signed in
    if(user != null){
      $('.user').html(`
      <div class="loginName"></div>
      <div class="loginImg"> <img src="${photoUrl}" title="${name}"></div>
      <div class="logout"><i class="fa fa-sign-out" aria-hidden="true"></i>Salir
      </div>
      `)
    }else{
      $('.user').html(`
         <div class="login"><i class="fa fa-sign-in" aria-hidden="true"></i> Entrar
         </div>
        `)
      $('#main').html(`
      <h4>Ingresa para guardar tus favorito</h4>
      <div class="login"><i class="fa fa-sign-in" aria-hidden="true"></i> Entrar
      </div>`)
      $('#favMain').html(`
      <h4>Ingresa para ver tus Favoritos</h4>
      <div class="login"><i class="fa fa-sign-in" aria-hidden="true"></i> Entrar
      </div>`)      
      }
    
   })


   

