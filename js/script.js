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
                $('#main').html("");
               for (var i = 0; i <= 9; i++) {       
                var element = lista.results[i];
                //console.log(element)
                $('#main').append(`
                <div class="elementBox">
                    <div class="contImg"><img src="${element.thumbnail}"></div>
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
    
$('.login').on('click',function(e){
        e.preventDefault();
        console.log("click en login")
       login()
    })
$('.logout').on('click',function (e) { 
        e.preventDefault();
        console.log("click en logout")
        logout()
        
    });

$('body').on('click','.addFav', function () {
    var idFav = $(this).attr('item-id')
    console.log(idFav)
    saveFavorito(idFav)
});
    

});
function saveFavorito(idFav) {
    // var newPostKey = firebase.database().ref().child('favoritos').push().key;
    firebase.database().ref(window.user.uid+'/favoritos/'+idFav ).update({
        id : idFav,
        status : true, //if true hay que mostrarlos
        views : 0
    });
}
 



