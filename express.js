const express = require('express');
const app = express();
const portNumber = process.env.PORT || 3001;

const list = require('./public/list.json');

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
});
