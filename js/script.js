//2390

  // Get a reference to the database service
var database = firebase.database();
  
var spinner = $('.spinner')
    spinner.hide()

 var DatosAmostrar = function(idML,img,price,title,address){
    this.idML=idML,
    this.imagen = img,
    this.precio = price,
    this.titulo = title,
    this.ubicacion = address,
    this.inFav = function (idML) {
        var state = favoritosEnBd.indexOf(this.idML)
        console.log(idML)
            if (state == -1){
                return false
            }else{
                return true
            }
      }
}
var dataItem = {}
var favoritosEnBd = []  

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
    
    $.fn.extend({
        animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
        }
    });
    
    firebase.auth().onAuthStateChanged(function(user) {
        firebase.database().ref(user.uid+"/favoritos").once('value', function(snapshot) {
            var itemsEnBd = snapshot.val()
            for (var key in itemsEnBd) {   
                //console.log(itemsEnBd[key].id)
                favoritosEnBd.push(itemsEnBd[key].id)  ///creo un array de los items en BD para comparar si ya esta guardado     
                }
            })
        })
    
    //metodo de jquery de usar el evento "on" pasando los eventos y su funcion
    $('.user').on({
       mouseover : function(){$('.logout').show('fast')},
       mouseleave : function (params) { $('.logout').hide('fast')} 
    })
}); 

var search = function (txtSearch) {
    spinner.show()
    $('#msje').html('Buscando... '+txtSearch)

    const url = 'https://api.mercadolibre.com/sites/MLA/search?q='+txtSearch+'&limit=10'
    console.log("Buscando: ", txtSearch)
    $.ajax({
        type: "get",
        url: url,
        //data: txtSearch,
        dataType: "json",
        success: function (response) {
            var lista = response            
            console.log("Lista de resultados"+lista.results.length)
            if(lista.results.length != 0){
              $('#main').html("")
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
            $('#msje').html('Buscaste:<span id="txtBusqueda">'+txtSearch+'</span>')
            }else{
                $('#main').html("")              
                $('#msje').html('0 Resultados')
                mostrarBusquedasPasadas()
            }  
        },
        complete: function(){
            spinner.hide()    
            }
        });
    }


var agragarItem = function (data) {
    //console.log("added desde funcion")
    console.log(data.idML+"-"+data.inFav())
   
    $('#main').append(`
    <div class="elementBox">
        <div class="contImg"><img src="${data.imagen}"></div>
        <div class="data">
        <div class="price">$ ${data.precio}</div>
        <div class="title">${data.titulo}</div>
        <div class="ubica">${data.ubicacion}</div>
        <div class="addFav" item-id="${data.idML}"><i class="fa fa-heart-o"></i></div>
        </div>                        
    </div>    
        `)
        $('.elementBox').animateCss('fadeIn');
        if(data.inFav()){
            $("[item-id='"+data.idML+"']").addClass('inFavoritos')
            $("[item-id='"+data.idML+"']").empty().html('<i class="fa fa-heart"></i>')
        }
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
        $(this).addClass('inFavoritos')
        $(this).empty().html('<i class="fa fa-heart"></i>')
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
       var okDelete =  confirm ("Quieres Quitar Esto de Favoritos?")
        var idFav = $(this).attr('item-id')
        console.log("delete: "+idFav)
        if (okDelete){
            removeFavorito(idFav)
        }
        //saveFavorito(idFav)
    });
    
function saveFavorito(idFav) {
    //console.log(datosUsuario.uid)
    // var newPostKey = firebase.database().ref().child('favoritos').push().key;
    firebase.database().ref(datosUsuario.uid+'/favoritos/'+idFav ).update({
        id : idFav,
        status : true, //if true hay que mostrarlos
        views : 0
    });
}
function saveSearch(search) {
    // var newPostKey = firebase.database().ref().child('favoritos').push().key;
    firebase.database().ref(datosUsuario.uid+'/busquedas/'+search ).update({
        text : search,
        views : 0
    });
}

var removeFavorito = function (item){
    firebase.database().ref(datosUsuario.uid+"/favoritos/"+item).remove()
    console.log("Borrado item: ",item)
}



