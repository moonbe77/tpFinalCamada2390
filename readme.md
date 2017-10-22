 #  Coderhouse Programación inicial
## TP FINAL

### La aplicación consta de 2 componentes principales
* vista principal
  * Caja de busqueda
  * Vista de resultados
* Vista favoritos
  * Listado de productos favoritos
  * Detalle de producto

### El sistema tiene que utilizar el siguiente stack tecnológico
* HTML
* JS (Deseable utilizar JQuery)
* CSS (Deseable utilizar sass)

### Tener en cuenta al planificar el sistema
* Usabilidad
* Performance
* Responsive

### Teniendo en cuenta lo antes indicado realizar lo siguiente

En la vista **Principal** dentro de la **caja de busqueda**, debería poder ingresar el producto a buscar y al enviar el formulario renderizar en **Vista de resultados** solo 10 productos.

Cada uno de los resultados tiene que tener un boton donde se le podrá seleccionar como favorito (utilizaremos localStorage como base de datos)

En la vista **favoritos** mostraremos los productos seleccionados como favoritos con la opción de quitarlos del listado de favoritos

Al seleccionar un producto se mostrará la vista de detalle del producto.

Dentro de cada vista se tiene que poder navegar entre vistas en la vista **Principal** se debe permitir limpiar la lista de resultados y en la vista de **Favoritos** volver a mostrar el listado de favoritos.

*tener en cuenta las vistas para el armado del sistema* 

### Endpoint a utilizar

* Busqueda: https://api.mercadolibre.com/sites/MLA/search?q=​:query 

* Producto: https://api.mercadolibre.com/items/​:id

* Descripcion: https://api.mercadolibre.com/items/​:id​/description 



