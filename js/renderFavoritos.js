$(document).ready(function () {

    var listaFavoritos = firebase.database().ref("vJBa84MoCZbQzvXS1xLHWU6N8B42/favoritos");
    
    listaFavoritos.on('value', function(snapshot) {
        console.log("DB Values: "+JSON.stringify(snapshot.val()))
        var objetosFavoritos = snapshot.val()

        $('#favMain').html("")
        
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
            element = data
            $('#favMain').append(`
            <div class="favoritosBox">
                <div class="favContImg"><img src="${element.pictures[0].url}"></div>
                <div class="favData">
                    <div class="favPrice">$ ${element.price}</div>
                    <div class="favTitle">${element.title}</div>
                    <div class="some">${element.condition}</div>
                    <div class="favSee" item-id="${element.id}"><i class="fa fa-heart"></i></div>
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