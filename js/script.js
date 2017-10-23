//2390

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
                var lista = response.results
                for (var key in lista) {
                        var element = lista[key];
                        $('#main').append(`<h4>${element.title}</h4>`)
                }
            }
        });
    }

});