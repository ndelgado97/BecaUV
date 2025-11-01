// src/middlewares/auth.js.js
import jwt from 'jsonwebtoken';
import config from '../config.js';

// Definimos la clave que se usará para firmar los tokens
const SECRET_KEY = config.dbConfig.apikey;

export const checkToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'No se proporcionó token de autorización'
            });
        }

        // Extraer el token del encabezado Authorization
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.substring(7) // Quitar 'Bearer '
            : authHeader; // Por compatibilidad, también aceptar el token sin 'Bearer '

        const payload = jwt.verify(token, SECRET_KEY);
        req.user = payload; // Almacena el payload para uso posterior
        next();
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado',
            error: error.message
        });
    }
};

export const checkUser = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'No se proporcionó token de autorización'
            });
        }

        // Extraer el token del encabezado Authorization
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.substring(7) // Quitar 'Bearer '
            : authHeader; // Por compatibilidad, también aceptar el token sin 'Bearer '

        const payload = jwt.verify(token, SECRET_KEY);
        
        // Verificar si el usuario es admin (asumiendo que el rol está en el payload)
        if (payload.role.toLowerCase().trim() !== 'administrador') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado: se requiere rol de administrador'
            });
        }
        
        req.user = payload; // Almacena el payload para uso posterior
        next();
        
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado',
            error: error.message
        });
    }
};

export const createToken = async (user) => {
    // Crear un payload para el token
    const payload = {
        id: user.recordset[0].id, //
        usuario: user.recordset[0].usuario,
        role: user.recordset[0].role
    };
    
    // Crear y devolver el token
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
};