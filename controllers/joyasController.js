const { Pool } = require("pg");
const format = require("pg-format"); 

// Configuración de la base de datos
// Parámetros de conexión a PostgreSQL
const pool = new Pool({
  host: "localhost",           
  database: "joyas",           // Nombre de la base de datos
  user: "postgres",            // REENPLAZAR POR USUARIO PostgreSQL
  password: "postgres",    // RREMPLAZAR POR CONTRASEÑA PostgreSQL
  port: 5432,                 
});

// Función para obtener joyas con HATEOAS, límites, paginación y ordenamiento
const obtenerJoyas = async ({ limits = 10, page = 1, order_by = "id_ASC" }) => {
  // Separar el campo y la dirección para el ordenamiento (por ejemplo, "id_ASC") con split
  const [campo, direccion] = order_by.split("_");

  // Paginación
  const offset = (page - 1) * limits;

  // Consulta SQL usando pg-format para evitar SQL injection
  const query = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    campo,    // Columna para ordenar (por ejemplo, "precio" o "stock")
    direccion, // Ascendente o descendente
    limits,    // Límite de joyas a devolver
    offset     // Desde dónde empezar (para la paginación)
  );

  // Imprimir la consulta que se envía a database para verificar que esté bien hecha
  console.log("Query generada:", query); 

  try {
    // Ejecutar la consulta
    const { rows } = await pool.query(query);

    // Estructura HATEOAS para devolver un enlace por cada joya
    return {
      total: rows.length, // Cantidad de joyas devueltas
      results: rows.map((j) => ({
        nombre: j.nombre,          // Nombre de la joya
        href: `/joyas/${j.id}`,    // Enlace a los detalles de la joya
      })),
    };
  } catch (error) {
    console.error("Error ejecutando la consulta:", error); // Log de errores
    throw error;
  }
};

// Filtrar joyas por parámetros
const obtenerJoyasFiltradas = async ({ precio_min, precio_max, categoria, metal }) => {
  const filtros = []; // Condiciones de filtrado
  const valores = []; // Array para valores parametrizados

  // Agregar un filtro a la consulta
  const agregarFiltro = (campo, operador, valor) => {
    filtros.push(`${campo} ${operador} $${valores.length + 1}`);
    valores.push(valor);
  };

  // Agregar filtros según los parámetros recibidos
  if (precio_min) agregarFiltro("precio", ">=", precio_min); // precio mínimo
  if (precio_max) agregarFiltro("precio", "<=", precio_max); // precio máximo
  if (categoria) agregarFiltro("categoria", "=", categoria); // categoría
  if (metal) agregarFiltro("metal", "=", metal); // tipo de metal

  // Consulta SQL
  let query = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    // Si hay filtros, los concateno con "AND"
    query += ` WHERE ${filtros.join(" AND ")}`;
  }

  // Ejecutar la consulta en la base de datos con los valores parametrizados
  try {
    const { rows } = await pool.query(query, valores);
    return rows; // Devolver los resultados obtenidos
  } catch (error) {
    console.error("Error ejecutando la consulta con filtros:", error); // Log de errores
    throw error; // Lanza el error para que sea manejado por la ruta
  }
};

// Exportar las funciones
module.exports = { obtenerJoyas, obtenerJoyasFiltradas };
