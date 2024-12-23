<h1>Desafío 5: Diseño avanzado de API REST</h1>
<p>Módulo 6: Backend con Node y Express (68) > Desafío - Tienda de Joyas<br><br></p>

<h2>Instrucciones para el usuario</h2>
<ol>
  <li><p>Descargar el archivo presionando en el botón verde que indica "Code", y luego en Download ZIP.</p></li>
  <li><p>Descomprimir <code>modulo6-desafio5-main.zip</code> en un directorio deseado.</p></li>
  <li><p>Abrir la carpeta <code>modulo6-desafio5-main</code> en Visual Studio Code.</p></li>
  <li><p>Abrir una terminal (preferiblemente bash).</p></li>
  <li><p>Desde la carpeta del proyecto, escribir <code>npm i</code> y ejecutar.</p></li>
</ol>

<h2>Requisitos de configuración</h2>
<ul>
  <li><p>Crear una base de datos en PostgreSQL llamada "joyas":</p>
    <code>CREATE DATABASE joyas;</code>
  </li>
  <li><p>Crear la tabla "inventario" con el siguiente comando:</p>
    <code>
      CREATE TABLE inventario (
        id SERIAL, 
        nombre VARCHAR(50), 
        categoria VARCHAR(50), 
        metal VARCHAR(50), 
        precio INT, 
        stock INT
      );
    </code>
  </li>
  <li><p>Insertar los siguientes datos en la tabla:</p>
    <code>
      INSERT INTO inventario VALUES 
      (DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
      (DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
      (DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
      (DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
      (DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
      (DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);
    </code>
  </li>
  <li><p>En el archivo <code>joyasController.js</code>, actualizar las líneas 9 y 10 con el usuario y contraseña de PostgreSQL.</p></li>
</ul>

<h2>Pruebas de la API</h2>
<p>Se recomienda utilizar clientes de API como Thunder Client o <a href="https://www.postman.com/downloads/" target="_blank">Postman</a>.</p>

<h3>Thunder Client</h3>
<ul>
  <li><p>Instalar la extensión Thunder Client en VSCode desde el apartado de extensiones (Ctrl+Shift+X).</p></li>
  <li><p>Una vez instalada, buscar el ícono con forma de rayo en la barra izquierda de VSCode y presionarlo.</p></li>
  <li><p>Presionar el botón <b>New Request</b> para iniciar una nueva consulta.</p></li>
  <li><p>Escribir <code>localhost:3000</code> en la barra superior.</p></li>
  <li><p>Seleccionar el método HTTP en el desplegable a la izquierda de la barra (por defecto es "GET").</p></li>
  <li><p>Para realizar consultas, agregar un <code>/</code> seguido de la ruta o filtros deseados (por ejemplo, <code>/joyas</code> o <code>/joyas/filtros?precio_min=20000</code>).</p></li>
  <li><p>Presionar el botón <b>Send</b> y revisar el resultado en la parte inferior.</p></li>
</ul>

<h3>Postman</h3>
<ul>
  <li><p>Descargar e instalar Postman desde su sitio oficial: <a href="https://www.postman.com/downloads/" target="_blank">Postman</a>.</p></li>
  <li><p>Abrir Postman y presionar el botón <b>New</b> en la parte superior izquierda.</p></li>
  <li><p>Seleccionar <b>Request</b> para crear una nueva consulta.</p></li>
  <li><p>Asignar un nombre a la consulta (opcional) y presionar <b>Save to collection</b> para guardarla, o saltar este paso.</p></li>
  <li><p>En el campo de URL, escribir <code>localhost:3000</code>.</p></li>
  <li><p>En el desplegable a la izquierda del campo de URL, seleccionar el método HTTP correspondiente (por defecto es "GET").</p></li>
  <li><p>Para realizar consultas, agregar un <code>/</code> seguido de la ruta o filtros deseados (por ejemplo, <code>/joyas</code> o <code>/joyas/filtros?precio_min=20000</code>).</p></li>
  <li><p>Presionar el botón <b>Send</b> para ejecutar la consulta y revisar el resultado en el panel inferior.</p></li>
</ul>

<h3>Ejemplos de consultas</h3>
<ul>
  <li><p>Probar sin parámetros (valores predeterminados):</p>
    <code>localhost:3000/joyas</code>
  </li>
  <li><p>Obtener las primeras 3 joyas ordenadas por precio ascendente:</p>
    <code>localhost:3000/joyas?limits=3&page=1&order_by=precio_ASC</code>
  </li>
  <li><p>Obtener la segunda página de joyas con un límite de 2 por página:</p>
    <code>localhost:3000/joyas?limits=2&page=2&order_by=id_DESC</code>
  </li>
  <li><p>Obtener joyas ordenadas por cantidad en stock descendente:</p>
    <code>localhost:3000/joyas?order_by=stock_DESC</code>
  </li>
  <li><p>Obtener 5 joyas ordenadas por nombre en orden alfabético:</p>
    <code>localhost:3000/joyas?limits=5&order_by=nombre_ASC</code>
  </li>
  <li><p>Filtrar joyas con precio entre 20,000 y 30,000:</p>
    <code>localhost:3000/joyas/filtros?precio_min=20000&precio_max=30000</code>
  </li>
  <li><p>Filtrar joyas de la categoría "aros":</p>
    <code>localhost:3000/joyas/filtros?categoria=aros</code>
  </li>
  <li><p>Filtrar joyas de metal "oro" con precio menor a 25,000:</p>
    <code>localhost:3000/joyas/filtros?metal=oro&precio_max=25000</code>
  </li>
  <li><p>Filtrar joyas de la categoría "collar" y metal "plata":</p>
    <code>localhost:3000/joyas/filtros?categoria=collar&metal=plata</code>
  </li>
  <li><p>Filtrar joyas con precio mayor a 40,000:</p>
    <code>localhost:3000/joyas/filtros?precio_min=40000</code>
  </li>
  <li><p>Filtro con parámetros incorrectos (debería devolver error o resultados vacíos):</p>
    <code>localhost:3000/joyas/filtros?precio_min=abc&precio_max=xyz</code>
  </li>
  <li><p>Parámetro de orden inválido en <code>/joyas</code> (debería devolver error):</p>
    <code>localhost:3000/joyas?order_by=invalid_field</code>
  </li>
  <li><p>Acceso a una ruta inexistente (debería devolver 404):</p>
    <code>localhost:3000/joyas/inexistente</code>
  </li>
</ul>

<h2>Créditos</h2>
<p>Desarrollado por Joaquín López Rojas para Desafío Latam, FullStack Javascript, Generación 68.<br>
Gracias por revisar mi desafío.</p>
<img src="https://media.tenor.com/LcL47Hq4cFAAAAAj/felices_fiestas_2021.gif" alt="Felices Fiestas" width="100">

