import {getConnection, sql} from '../database/connection.js'

// Peticiones Alumnos
export const verAlumnos = async (req, res) => {
   const pool = await getConnection();
   const result = await pool.request().query('SELECT * FROM alumnos');

   res.json(result.recordset);
};

export const verAlumnoId = async (req, res) => {
   const {id} = req.params;

   const pool = await getConnection();
   const result = await pool.request()
   .input('id', id)
   .query('SELECT * FROM alumnos WHERE id = @id')

   res.send(result.recordset[0]);
};

export const agregarAlumno = async (req, res) =>{
   let { nombre, rut, cantidad} = req.body;
   const canje = 0;

   const fecha = 'Sin canje aún';

   const pool = await getConnection();
   await pool.request()
   .input("nombre", sql.VarChar, nombre)
   .input("rut", sql.VarChar, rut)
   .input("cantidad", sql.Int, cantidad)
   .input("canje", sql.Int, canje)
   .input("fecha", sql.VarChar, fecha)
   .query('INSERT INTO alumnos (nombre, rut, cantidad, canje, fecha) VALUES (@nombre, @rut, @cantidad, @canje, @fecha)');
};

export const borrarAlumno = async (req, res) => {
   const {id} = req.params;

   const pool = await getConnection();
   await pool.request()
   .input('id', id)
   .query('DELETE FROM alumnos WHERE id = (CAST(@id AS VARCHAR))');
};

export const editarAlumno = async (req, res) => {
   let { nombre, rut, cantidad } = req.body;
   const {id} = req.params;

   const pool = await getConnection();
   await pool.request()
   .input("nombre", sql.VarChar, nombre)
   .input("rut", sql.VarChar, rut)
   .input("cantidad", sql.Int, cantidad)
   .input("id", sql.Int, id)
   .query('UPDATE alumnos SET nombre = @nombre, rut = @rut, cantidad = @cantidad WHERE id = @id');
}