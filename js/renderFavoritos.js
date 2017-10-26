$(document).ready(function () {
    console.log("cargando")
    console.log("user data: "+user)

var listaFavoritos = firebase.database().ref("vJBa84MoCZbQzvXS1xLHWU6N8B42/favoritos");

listaFavoritos.on('value', function(snapshot) {
    //console.log("DB Values: "+JSON.stringify(snapshot.val()))
    var objetosFavoritos = snapshot.val()
    var objetoKEY = snapshot.key
    console.log(objetoKEY)
    console.log(objetosFavoritos)
    $('#favMain').html("")//borro el contenido para que no se duplique
    
    for (var key in objetosFavoritos) {
        var element = objetosFavoritos[key];
        //console.log("for in: ",element.id)
        renderFavoritos(element.id)
    }
});
    
var renderFavoritos = function (itemID) {
    const url = 'https://api.mercadolibre.com/items/'+itemID
<<<<<<< HEAD
    console.log("Favorito: ", itemID)
    $.get(url, function(data, status){        
        var renderImg
        /*for (var i in data.pictures) {
            var url = data.pictures[i].url
             renderImg =+ `<img src="${url}">` 
            console.log(renderImg)
        }*/
        //var imagenes = 
        for (var i = 0; i < data.pictures.length; i++) {            
            var url =`<img src="${data.pictures[i].url}">`
            renderImg =+ url
           console.log(renderImg)            
        }
=======
    //console.log("Favorito: ", itemID)
>>>>>>> e76c3ced4a2290a66492761d4952d6123f1909fd

    $.get(url, function(data, status){  
       // console.log(data)
        $('#favMain').append(`
        <div class="favoritosBox flash">
            <div class="favContImg">
                <img src="${data.pictures[0].url}">
                <!--<ul class="rslides">
                </ul>-->
            </div>
            <div class="favData">
                <div class="favPrice">$ ${data.price}</div>
                <div class="favTitle">${data.title}</div>
                <div class="some">${data.condition}</div>
                <div class="detail" item-id="${data.id}"><i class="fa fa-plus"></i> Detalles</div>
                <div class="delete" item-id="${data.id}"><i class="fa fa-trash"></i> Delete</div>
            </div>                        
        </div>`)

        /*for (var i in data.pictures) {            
             $('.rslides').append(`<li><img src="${data.pictures[i].url}"></li>`)
        }
        activarSlider()*/
    });    
}



 
/*
var activarSlider = function (){
    $(".rslides").responsiveSlides({
        auto: fale,             // Boolean: Animate automatically, true or false
        speed: 500,            // Integer: Speed of the transition, in milliseconds
        timeout: 1000,          // Integer: Time between slide transitions, in milliseconds
        pager: false,           // Boolean: Show pager, true or false
        nav: false,             // Boolean: Show navigation, true or false
    random: false,          // Boolean: Randomize the order of the slides, true or false
    pause: true,           // Boolean: Pause on hover, true or false
    pauseControls: true,    // Boolean: Pause when hovering controls, true or false
    prevText: "Previous",   // String: Text for the "previous" button
    nextText: "Next",       // String: Text for the "next" button
    maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
    navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
    manualControls: "",     // Selector: Declare custom pager navigation
    namespace: "rslides",   // String: Change the default namespace used
    before: function(){},   // Function: Before callback
    after: function(){}     // Function: After callback
  });
}*/
  

});