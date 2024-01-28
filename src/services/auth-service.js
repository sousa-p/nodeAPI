'use strict'

const jwt = require('jsonwebtoken');

exports.generateToken = (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: '3d' });
}

exports.decodeToken = (token) => {
  return jwt.verify(token, global.SALT_KEY);
}

exports.authorize = (req, res, next) => {
  if (!req.headers['authorization']) return res.status(401).json({ message: 'Restricted access' });

  const token = req.headers['authorization'].split(' ')[1];

  jwt.verify(token, global.SALT_KEY, (error, decoded) => {
    if (error) return res.status(401).json({ message: 'Invalid token' });
    if (!decoded) return res.status(404).json({ message: 'Not found customer' });
    next();
  });
}


