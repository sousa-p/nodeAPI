'use strict'

const jwt = require('jsonwebtoken');

exports.generateToken = (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: '3d' });
}

exports.decodeToken = (data) => {
  return jwt.verify(token, global.SALT_KEY);
}

exports.authorize = (req, res, next) => {
  if (!req.headers['Authorize']) return res.status(401).json({ message: 'Restricted access' });

  const token = req.headers['Authorize'].split(' ')[1];

  jwt.verify(token, global.SALT_KEY, (error, decoded) => {
    if (error) return res.status(401).json({ message: 'Invalid token' });
    next();
  });
}

