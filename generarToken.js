const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

function generarToken(usuario) {
  const claveSecreta = process.env.CLAVE_SECRETA; 

  const token = jwt.sign(usuario, claveSecreta, { expiresIn: '1h' });

  return token;
}

const usuario = {
  id: process.env.ID,
  nombre: process.env.NOMBRE,
  rol: 'admin'
};

const tokenGenerado = generarToken(usuario);

fetch('http://localhost/ChocoAndino', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${tokenGenerado}`
  }
})

console.log('Token exportado:', tokenGenerado);