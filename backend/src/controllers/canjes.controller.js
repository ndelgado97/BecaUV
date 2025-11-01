import {getConnection, sql} from '../database/connection.js'

// Peticiones Canje de beca
export const verCanjeRut = async (req, res) => {
    const {rut} = req.params;
 
    const pool = await getConnection();
    const result = await pool.request()
    .input('rut', rut)
    .query('SELECT * FROM alumnos WHERE rut = @rut')
    const respuesta = result.recordset.length;

    const fechaActual = new Date();

    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, así que se suma 1
    const anio = fechaActual.getFullYear();

    const fechaCanje = dia+'-'+mes+'-'+anio;
 
    if (respuesta === 1) {
      if ( fechaCanje != result.recordset[0].fecha.trim() ) {
         res.send(result.recordset[0]);
      }
      else{
         res.sendStatus(201);
      }
    }
    else {
       res.sendStatus(404);
    }
 };
 
 export const canjeAlumno = async (req, res) => {
    const {rut} = req.params;
    const {idCasino} = req.params;

    const fechaActual = new Date();

    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, así que se suma 1
    const anio = fechaActual.getFullYear();

    const fechaCanje = dia+'-'+mes+'-'+anio;

    const pool = await getConnection();
    await pool.request()
    .input("rut", rut)
    .input("fechaCanje", sql.VarChar, fechaCanje)
    .query('UPDATE alumnos SET cantidad = (cantidad - 1), canje = (canje + 1), fecha = @fechaCanje WHERE rut = @rut')
    res.sendStatus(201)
    canje(idCasino);
 }
 
 const canje = async (idCasino) => {
 
    const pool = await getConnection();
    await pool.request()
    .input("idCasino", idCasino)
    .query('UPDATE casinos SET cantidad = (cantidad + 1) WHERE id = @idCasino')
 }