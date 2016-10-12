var express = require('express');
var app = express();
var port = 1701;
app.get('/', function (req, res) {
  res.send('Display data here');
});

app.listen(port, function () {
  console.log('Server running on:', port);
});
