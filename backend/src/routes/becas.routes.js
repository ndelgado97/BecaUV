import {Router} from 'express'
import rateLimit from 'express-rate-limit'
import {agregarAlumno, borrarAlumno, editarAlumno, verAlumnoId, verAlumnos} from '../controllers/alumnos.controller.js'
import {agregarCasino, borrarCasino, editarCasino, verCasinoId, verCasinos} from '../controllers/casinos.controller.js'
import {canjeAlumno, verCanjeRut} from '../controllers/canjes.controller.js'
import {loginUsuario, agregarUsuario, verUsuarios, borrarUsuario, verUsuarioId, loginValidation, registerValidation} from '../controllers/login.controller.js'
import { checkToken, checkUser} from '../middlewares/auth.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta del archivo de log
const logPath = path.join(__dirname, 'login_attempts.log');

// Función para escribir en el log
function registrarIntentoBloqueado(usuario, ip) {
  const mensaje = `[${new Date().toISOString()}] Usuario bloqueado: ${usuario || 'Desconocido'} - IP: ${ip}\n`;
  fs.appendFile(logPath, mensaje, err => {
    if (err) console.error('Error al escribir en el log:', err);
  });
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos maximo por usuario o IP
  keyGenerator: (req) => req.body.usuario || req.ip,
  handler: (req, res) => {
    registrarIntentoBloqueado(req.body.usuario, req.ip);
    res.status(429).json({
      success: false,
      message: 'Demasiados intentos de login, intente más tarde'
    });
  }
});

//endpoint alumnos
router.get('/alumnos', checkToken, verAlumnos);
router.get('/alumnos/:id', checkUser, verAlumnoId);
router.post('/alumnos', checkUser, agregarAlumno);
router.delete('/alumnos/:id', checkUser, borrarAlumno);
router.put('/alumnos/:id', checkUser, editarAlumno);

//endpoint casinos
router.get('/casinos', verCasinos);
router.get('/casinos/:id', checkUser, verCasinoId);
router.post('/casinos', checkUser, agregarCasino);
router.delete('/casinos/:id', checkUser, borrarCasino);
router.put('/casinos/:id', checkUser, editarCasino);

//endpoint canjes en la raspberry
router.get('/canjes/:rut/:idCasino', verCanjeRut);
router.patch('/canjes/:rut/:idCasino', canjeAlumno);

//endpoint login
router.post('/login', loginLimiter, loginValidation, loginUsuario);

//endpoint admin
router.get('/admin', checkUser, verUsuarios);
router.get('/admin/:id', checkUser, verUsuarioId);
router.post('/admin',checkUser, registerValidation, agregarUsuario);
router.delete('/admin/:id',checkUser, borrarUsuario);

export default router;