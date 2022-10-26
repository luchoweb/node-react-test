'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { PORT = 0 } = process.env;
const ApiKeyMiddleware = require('./middlewares/apikey.middleware');

app.use(cors({
  origin: '*',
  methods: 'GET',
  optionsSuccessStatus: 200
}));

// Check API Key
app.use(ApiKeyMiddleware.check);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Route
const bizRoutes = require('./routes/biz.route');
app.use(`/biz`, bizRoutes);

// 404
app.get('*', (req, res) => {
  res.status(404).send({
    statusCode: 404,
    statusMessage: `The route doesn't exist!`
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${server.address().port}`);
});

module.exports = server;
