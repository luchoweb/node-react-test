require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5001;

var corsOptions = {
  origin: '*',
  methods: 'GET',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
