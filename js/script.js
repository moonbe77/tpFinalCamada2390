//2390


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCAgMMpJb1RDRtaxVm2bO-fEOArvyUJ0Gk",
    authDomain: "progwebfinal.firebaseapp.com",
    databaseURL: "https://progwebfinal.firebaseio.com",
    projectId: "progwebfinal",
    storageBucket: "progwebfinal.appspot.com",
    messagingSenderId: "659953279005"
  };
  firebase.initializeApp(config);
  // Get a reference to the database service
var database = firebase.database();



$(document).ready(function () {    
    
    $('#searchInput').keypress(function (e) {         
        var valorInput = $('#searchInput').val()
        if (e.which == 13) {
            console.log(e.which)//(event) e.which devuelve el keycode e.type devuelve el tipo de evento            
            //$('#main').text(valorInput);
            search(valorInput)            
        }
    });
    $('#searchButton').click(function (e) {         
        var valorInput = $('#searchInput').val()           
       // $('#main').text(valorInput); 
        search(valorInput)
       })

    var search = function (txtSearch) {
        const url = 'https://api.mercadolibre.com/sites/MLA/search?q='+txtSearch
        console.log("Buscando: ", txtSearch)
        $.ajax({
            type: "get",
            url: url,
            //data: txtSearch,
            dataType: "json",
            success: function (response) {
                var lista = response
               for (var i = 0; i <= 9; i++) {       
                var element = lista.results[i];
                //console.log(element)
                $('#main').append(`
                <div class="elementBox">
                    <figure><img src="${element.thumbnail}"></figure>
                    <div class="data">
                        <div class="price">$ ${element.price}</div>
                        <div class="title">${element.title}</div>
                        <div class="ubica">${element.address.state_name}</div>
                        <div class="addFav" item-id="${element.id}"><i class="fa fa-heart"></i></div>
                    </div>                        
                </div>
                `)
                }
            }
        });
    }

    var addFavorito = function(id){
    }
    $('body').on('click','.addFav', function () {
        var idFav = $(this).attr('item-id')
        localStorage.setItem('favoritosML',idFav)
        
        firebase.database().ref('favoritos/').set({
            username: name 
          })
        console.log(idFav)
        saveFavorito(idFav)
    });
    
$('#login').click(function(){
   login()
})

});

function saveFavorito(idFav) {
    var userId = firebase.auth().currentUser.uid
    firebase.database().ref('favoritos/'+userId).push({
      id: idFav
    });
  }

  var starCountRef = firebase.database().ref('favoritos/');
  starCountRef.on('value', function(snapshot) {
    //updateStarCount(postElement, snapshot.val());
    console.log(snapshot.val())
  });

  /*return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // ...
  });*/