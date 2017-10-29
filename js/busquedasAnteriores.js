//Busquedas pasasdas
$(document).ready(function () {    
    firebase.auth().onAuthStateChanged(function(user) {
        mostrarBusquedasPasadas()  
    } )
    
$('body').on('click','.searchOld', function (){
   var busqueda = $(this).attr('data-search');
   console.log(busqueda)
   search(busqueda)
})
});

var mostrarBusquedasPasadas = function (params) {
    var listaFavoritos = firebase.database().ref(user.uid+"/busquedas");        
    listaFavoritos.once('value', function(snapshot) {
        //console.log("DB Values: "+JSON.stringify(snapshot.val()))
        var objetosFavoritos = snapshot.val()
        var objetoKEY = snapshot.key
        //console.log(user.uid)
        //console.log(objetosFavoritos)
        $('#main').append('<h3>Busquedas Anteriores</h3><div id="delSearch"><i class="fa fa-trash"></i></div>')
        $('#main').append('<div id="help"> click para buscar de nuevo</div>')
        $('#main').append('<div id="boxSearch">')
        
        for (var key in objetosFavoritos) {
            var element = objetosFavoritos[key];
            //console.log("for in: ",element)
            $('#boxSearch').append(`
            <div class="searchs">                
            <a class="searchOld" data-search="${element.text}"><i class="fa fa-link"></i> "${element.text}"</a>  
            </div>`)
        }
        $('#main').append('</div>')
        $('.favoritosBox').animateCss('bounceInUp');
    });
}