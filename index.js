const express = require("express");
const mongoose = require("mongoose");
const app = express();

//database

mongoose.connect(
  "mongodb+srv://backend:javaevida@cluster0-gmlei.mongodb.net/backendvini?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(express.json());

require("./controllers/authController")(app);

app.listen(3333, error => {
  if (error) console.log("um erro aconteceu", error);
  else console.log(`servidor rodando na porta 3333`);
});
