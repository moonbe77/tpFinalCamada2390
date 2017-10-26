$(document).ready(function () {
    
    var itemId  = location.search.slice(4);
    console.log(itemId)    
    const url = 'https://api.mercadolibre.com/items/'+itemId
    $.get(url, function(data, status){  
        
        console.log(data.pictures.length)
        $('#favMain').append(`
            <div class="detailBox">
                <div class="detailContImg">
                    <ul class="rslides">
                    </ul>
                </div>
                <div class="detailData">
                    <div class="detailPrice">$ ${data.price}</div>
                    <div class="detailTitle">${data.title}</div>
                    <div class="some">${data.condition}</div>
                    <div class="detalleText"></div>                    
                </div>                        
            </div>`)

        for (var i in data.pictures) {            
             $('.rslides').append(`<li><img src="${data.pictures[i].url}"></li>`)
        }
    console.log(status)
        if(status == "success"){
            console.log("buscando el detalle XXXXXXX:",data.id)
            detalle(data.id)
        }else{
            alert("hubo algun problema cargando los detalles")
        }
       
    });    

var detalle = function(id){
    console.log("buscando el detalle de:",id)
    var urlDetalle = 'https://api.mercadolibre.com/items/'+id+'/description';
    $.get(urlDetalle, function(data, status){ 
        $('.detalleText').html(data.text);
     })
      activarSlider()
}

var activarSlider = function (){
    $(".rslides").responsiveSlides({
        auto: false,             // Boolean: Animate automatically, true or false
        speed: 500,            // Integer: Speed of the transition, in milliseconds
        timeout: 1000,          // Integer: Time between slide transitions, in milliseconds
        pager: false,           // Boolean: Show pager, true or false
        nav: true,             // Boolean: Show navigation, true or false
    random: false,          // Boolean: Randomize the order of the slides, true or false
    pause: true,           // Boolean: Pause on hover, true or false
    pauseControls: true,    // Boolean: Pause when hovering controls, true or false
    prevText: "Previous",   // String: Text for the "previous" button
    nextText: "Next",       // String: Text for the "next" button
    maxwidth: "150px",           // Integer: Max-width of the slideshow, in pixels
    navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
    manualControls: "",     // Selector: Declare custom pager navigation
    namespace: "rslides",   // String: Change the default namespace used
    before: function(){},   // Function: Before callback
    after: function(){}     // Function: After callback
  });
}
  
});