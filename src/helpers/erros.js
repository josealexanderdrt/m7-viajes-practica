const ERRORS = [
  { code: 23502, status: 400, message: "El campo Destino o prosupuesto no puede estar vacio" },
  {code: "22P02", status: 400, message: "Destino debe ser VARCHAR(50) y presupuesto debe ser un número entero no nulo."},
  {code: 22001, status: 400, message: "Estan tratando de insertar un valor con una longitud no permitida por la tabla"}
];


export default ERRORS