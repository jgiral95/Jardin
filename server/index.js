// Incluir las librerias necesarias
const path = require('path');
const express = require('express');
const http = require('http');
const SocketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = SocketIo.listen(server);
const request = require('request');

// Rutas existentes

app.get('/', (req, res) => {
  res.sendFile(__dirname +'/index.html');
});

app.get('/icon', (req, res) => {
  res.sendFile(__dirname +'/favicon.png');
});

app.get('/graf2', (req, res) => {
  res.sendFile(__dirname +'/grafica2.html');
});


app.get('/graf', (req, res) => {
  res.sendFile(__dirname +'/grafica.html');

  var options = { method: 'GET',
  url: 'https://api.thinger.io/v2/users/jgiral95/devices/Jardin/Luz',
  headers:
  { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJKYXJkaW4iLCJpYXQiOjE1Mjc2MDc2NDEsImp0aSI6IjViMGQ3MTU5MjNlYmFiOWM5MDY0NTUwMyIsInVzciI6ImpnaXJhbDk1In0.5Hli_okIUg21TlbzMlp4tUmYJbJmqH9QRN2tbya1BWk',
  'Content-Type': 'application/json' },
  json: true };

  request(options, function (error, response, body) {
    if (error){
      console.log("GET Luz fallido")
    }

    if(body==null){
    }
    else{
      io.emit('Luz:data', {
        value: body.out.toString()
      });
    };
  });

  var options = { method: 'GET',
  url: 'https://api.thinger.io/v2/users/jgiral95/devices/Jardin/Humedad',
  headers:
  { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJKYXJkaW4iLCJpYXQiOjE1Mjc2MDc2NDEsImp0aSI6IjViMGQ3MTU5MjNlYmFiOWM5MDY0NTUwMyIsInVzciI6ImpnaXJhbDk1In0.5Hli_okIUg21TlbzMlp4tUmYJbJmqH9QRN2tbya1BWk',
  'Content-Type': 'application/json' },
  json: true };

  request(options, function (error, response, body) {
    if (error){
      console.log("GET Humedad fallido")
    }
    if(body==null){
    }
    else{
      io.emit('Humedad:data', {
        value: body.out.toString()
      });
    };
  });

  var options = { method: 'GET',
  url: 'https://api.thinger.io/v2/users/jgiral95/devices/Jardin/Temperatura',
  headers:
  { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJKYXJkaW4iLCJpYXQiOjE1Mjc2MDc2NDEsImp0aSI6IjViMGQ3MTU5MjNlYmFiOWM5MDY0NTUwMyIsInVzciI6ImpnaXJhbDk1In0.5Hli_okIUg21TlbzMlp4tUmYJbJmqH9QRN2tbya1BWk',
  'Content-Type': 'application/json' },
  json: true };

  request(options, function (error, response, body) {
    if (error){
      console.log("GET Temperatura fallido")
    }
    if(body==null){
    }
    else{
      io.emit('Temperatura:data', {
        value: body.out.toString()
      });
    };
  });
});

app.use(express.static(path.join(__dirname, 'public')));

server.listen(process.env.PORT || 8000, () => {
  console.log('Server on port 8000');
});
