const express = require('express');
const app = express();
const portNumber = 3001;
const sourceDir = 'dist';

const list = require('./src/data/list.json');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  next();
});

app.get('/', function (req, res) {
  res.send(app.routes);
});

app.get('/list', (req, res) => {
  res.send(list);
});

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
