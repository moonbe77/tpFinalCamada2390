$(document).ready(function () {
    console.log(user)

var listaFavoritos = firebase.database().ref("vJBa84MoCZbQzvXS1xLHWU6N8B42/favoritos");

listaFavoritos.on('value', function(snapshot) {
    console.log("DB Values: "+JSON.stringify(snapshot.val()))
    var objetosFavoritos = snapshot.val()
    
    $('#favMain').html("")//borro el contenido para que no se duplique
    
    for (var key in objetosFavoritos) {
        var element = objetosFavoritos[key];
        console.log("for in: ",element.id)
        renderFavoritos(element.id)
    }
});
    
var renderFavoritos = function (itemID) {
    const url = 'https://api.mercadolibre.com/items/'+itemID
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

        $('#favMain').append(`
        <div class="favoritosBox">
            <div class="favContImg">${renderImg}</div>
            <div class="favData">
                <div class="favPrice">$ ${data.price}</div>
                <div class="favTitle">${data.title}</div>
                <div class="some">${data.condition}</div>
                <div class="favSee" item-id="${data.id}"><i class="fa fa-heart"></i></div>
            </div>                        
        </div>
        `)
    });

        /*$.ajax({
            type: "get",
            url: url,
            //data: txtSearch,
            dataType: "json",
            success: function (response) {
                var lista = response
                $('#main').html("");
               //for (var i = 0; i <= 9; i++) {       
                var element = lista
                console.log(element)

                $('#main').append(`
                <div class="favoritosBox">
                    <figure><img src="${element.thumbnail}"></figure>
                    <div class="data">
                        <div class="price">$ ${element.price}</div>
                        <div class="title">${element.title}</div>
                        <div class="ubica">${element.condition}</div>
                        <div class="addFav" item-id="${element.id}"><i class="fa fa-heart"></i></div>
                    </div>                        
                </div>
                `)
                //}
            },
            error: function(error){
                alert (error)
            },
            complete: function () {
                console.log("complete")                
            }
        });*/
    }


});