const express = require("express");

const app = express();

const axios = require("axios").default;

var cors = require('cors');

let data1;

app.use(cors());

app.use("/", express.static("./"));

app.get("/", function (request, response) {
  response.send("<h1>Главная страница</h1>");
});

app.get("/about", function (request, response) {
  response.sendFile(__dirname + "/almac.html");
});

app.get("/contact", function (request, response) {
  response.sendFile(__dirname + "/meteohome.html");
});

app.use("/proxy", function (request, response) {
  const addr = request.query.a;
  response.set('Content-Type','text/plain');
  async function proxy() {
    try {
      const resp = await axios.get(`${addr}`);
      console.log(resp.data);
      data1 = resp.data;
      response.send(`${data1}`);
      data1 = "";
    } catch (error) {
      console.error(error);
    }
  }
  proxy();
});

// app.get("/proxy", function (request, response) {
//   async function getUsers() {
//     try {
//       const resp = await axios.get(`https://meteo.zahonie.keenetic.pro/graph`);
//       console.log(resp.data);
//       data1 = resp.data;
//       response.send(`${data1}`);
//       data1 = "";
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   getUsers();
// });

app.listen(80);

//http://192.168.1.62/proxy?a=https://meteo.zahonie.keenetic.pro/graph
