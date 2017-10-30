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
$('body').on('click','#delSearch', function (){
    firebase.database().ref(user.uid+"/busquedas").remove()
    location.reload();
 })
});

var mostrarBusquedasPasadas = function (params) {
    var listaFavoritos = firebase.database().ref(user.uid+"/busquedas");        
    listaFavoritos.once('value', function(snapshot) {
        var objetosFavoritos = snapshot.val()
        console.log(objetosFavoritos)
        if(objetosFavoritos == null){
            $('#main').html('<h3>Busquedas Anteriores</h3> no tienes busquedas</div>')  
        }else{
            $('#main').empty()        
            $('#main').append('<h3>Busquedas Anteriores</h3><div id="delSearch"><i class="fa fa-trash"></i></div>')
            $('#main').append('<div id="help"> click para buscar de nuevo</div>')
            $('#main').append('<div id="boxSearch">')
            
            for (var key in objetosFavoritos) {
                var element = objetosFavoritos[key];
                $('#boxSearch').append(`
                <div class="searchs">                
                <a class="searchOld" data-search="${element.text}"><i class="fa fa-link"></i> "${element.text}"</a>  
                </div>`)
            }
            $('#main').append('</div>')
            $('.favoritosBox').animateCss('bounceInUp');   
        }
        
    });
}