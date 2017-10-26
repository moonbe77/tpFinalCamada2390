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

   var spinner = $('.spinner')
   spinner.hide()

 var DatosAmostrar = function(idML,img,price,title,address){
    this.idML=idML,
    this.imagen = img,
    this.precio = price,
    this.titulo = title,
    this.ubicacion = address
}
var dataItem = {}  

$(document).ready(function () {  

    $('#searchInput').keypress(function (e) {         
        var valorInput = $('#searchInput').val()
        if (e.which == 13) {
            console.log(e.which)//(event) e.which devuelve el keycode e.type devuelve el tipo de evento   
            search(valorInput)            
            saveSearch(valorInput)            
        }
        
    });
    
    $('#searchButton').click(function (e) {         
        var valorInput = $('#searchInput').val()
        search(valorInput)
        saveSearch(valorInput)  
    })
}); 

var search = function (txtSearch) {
    spinner.show()
    const url = 'https://api.mercadolibre.com/sites/MLA/search?q='+txtSearch+'&limit=10'
    console.log("Buscando: ", txtSearch)
    $.ajax({
        type: "get",
        url: url,
        //data: txtSearch,
        dataType: "json",
        success: function (response) {
            var lista = response
            console.log(lista)
            $('#main').html("");

            for (var i = 0; i <= 9; i++) {       
                var element = lista.results[i];
                dataItem = new DatosAmostrar(
                    element.id,
                    element.thumbnail,
                    element.price,
                    element.title,
                    element.address.state_name
                )
                agragarItem(dataItem)
            }
        },
        complete: function(){
            spinner.hide()
                //yaEstoyEnFavotitos()
            }
        });
    }

        //validar si este item ya esta en favoritos
var yaEstoyEnFavotitos = function(){
    var items = $('.addFav')
    for (var key in items) {        
        //var element = arrItems[key].attributes['item-id'].nodeValue;
        console.log(items)       
        }
    }

var agragarItem = function (data) {
    console.log("added desde funcion")
    $('#main').append(`
    <div class="elementBox">
        <div class="contImg"><img src="${data.imagen}"></div>
        <div class="data">
        <div class="price">$ ${data.precio}</div>
        <div class="title">${data.titulo}</div>
        <div class="ubica">${data.ubicacion}</div>
        <div class="addFav" item-id="${data.idML}"><i class="fa fa-heart"></i></div>
        </div>                        
    </div>    
        `)
        $('.elementBox').animateCss('fadeIn');
}
    $('body').on('click','.login',function(e){
        e.preventDefault();
        console.log("click en login")
        login()
    })

    $('body').on('click','.logout',function (e) { 
        e.preventDefault();
            console.log("click en logout")
            logout()        
        });
        
    $('body').on('click','.addFav', function () {
        var idFav = $(this).attr('item-id')
        console.log(idFav)
        saveFavorito(idFav)
    });  

    $('body').on('click','.detail', function () {
        var idFav = $(this).attr('item-id')
        console.log("detail: "+idFav)
        window.location.href = `detalle.html?id=${idFav}`;
        //saveFavorito(idFav)
    });

    $('body').on('click','.delete', function () {
        var idFav = $(this).attr('item-id')
        console.log("delete: "+idFav)
        removeFavorito(idFav)
        //saveFavorito(idFav)
    });


    
function saveFavorito(idFav) {
    // var newPostKey = firebase.database().ref().child('favoritos').push().key;
    firebase.database().ref(window.user.uid+'/favoritos/'+idFav ).update({
        id : idFav,
        status : true, //if true hay que mostrarlos
        views : 0
    });
}
function saveSearch(search) {
    // var newPostKey = firebase.database().ref().child('favoritos').push().key;
    firebase.database().ref(window.user.uid+'/busquedas/'+search ).update({
        text : search,
        views : 0
    });
}

var removeFavorito = function (item){
    firebase.database().ref("vJBa84MoCZbQzvXS1xLHWU6N8B42/favoritos/"+item).remove()
    console.log("Borrado item: ",item)
}



