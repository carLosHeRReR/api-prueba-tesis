const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, 'tu_secreto_secreto', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ error: 'Token no proporcionado' });
  }
}

module.exports = authMiddleware;