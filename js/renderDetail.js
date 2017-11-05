$(document).ready(function () {
    spinner.show()
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
                    <div class="boxPrecio">
                        <div class="detailPrice">$ ${data.price}</div>
                        <div class="detailTitle">${data.title}</div>
                        <div class="some">${data.condition}</div>
                    </div>
                    <div class="boxCantidad">
                        <span class="qty">Cant. Inicial: ${data.initial_quantity}</span>
                        <span class="qty">Cant. Disponible: ${data.available_quantity}</span>
                        <span class="qty">Vendidos: ${data.sold_quantity}</span>
                    </div>
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
            $('.detailBox').animateCss('bounceInUp');
            
        }else{
            alert("hubo algun problema cargando los detalles")
        }
       
    });    

var detalle = function(id){
    console.log("buscando el detalle de:",id)
    var urlDetalle = 'https://api.mercadolibre.com/items/'+id+'/description';
    $.get(urlDetalle, function(data, status){ 
        if(data.text == ""){
            var txt = nl2br(data.plain_text); 
            $('.detalleText').html(txt)
        }else{
            $('.detalleText').html(data.text)            
        }       
     })
      activarSlider()
      spinner.hide()
}

//FUNCION PARA GREGAR SALTOS DE LINEA AL PLAIN TEXT DEVUELOT POR MELI
function nl2br (str, is_xhtml) {
    console.log("nl2br")
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n|\r\n\r\n)/g, '$1' + breakTag + '$2');
}


var activarSlider = function (){
    $(".rslides").responsiveSlides({
        auto: true,             // Boolean: Animate automatically, true or false
        speed: 1000,            // Integer: Speed of the transition, in milliseconds
        timeout: 3000,          // Integer: Time between slide transitions, in milliseconds
        pager: false,           // Boolean: Show pager, true or false
        nav: true,             // Boolean: Show navigation, true or false
    random: false,          // Boolean: Randomize the order of the slides, true or false
    pause: true,           // Boolean: Pause on hover, true or false
    pauseControls: true,    // Boolean: Pause when hovering controls, true or false
    prevText: "<..<.|",   // String: Text for the "previous" button
    nextText: "|.>..>",       // String: Text for the "next" button
    //maxwidth: "150px",           // Integer: Max-width of the slideshow, in pixels
    navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
    manualControls: "",     // Selector: Declare custom pager navigation
    namespace: "rslides",   // String: Change the default namespace used
    before: function(){},   // Function: Before callback
    after: function(){}     // Function: After callback
  });
}
$(window).scroll(function(e){
    //$("span").text(x += 1);
    console.log(e)
});
});