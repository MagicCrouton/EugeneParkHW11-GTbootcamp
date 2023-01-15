const express = require('express');
const app = express();
const path = require('path');
const uuid = require('./Utilites/uuid');
const dataBase = require('./db/db.json');
const fs = require('fs');
const { json } = require('express');
const PORT = process.env.ExpressPort || 3001;



// middleware
// express static makes a folder available to public
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
// this route is for the general connection it will send indexed.html as the preset
// It doesn't seem like i need the first app.get if i use the public folder
app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`));
app.get('/notes', (req, res) => res.sendFile(`${__dirname}/public/notes.html`));

// API call routes
app.get('/api/notes', (req, res) => res.json(dataBase));

// this route needs to accept note and add it to database
app.post('/api/notes', (req, res) => {
  let idAdd = req.body;
  idAdd.id = uuid();
  dataBase.push(idAdd);
  fs.writeFile('./db/db.json', JSON.stringify(dataBase,null,2), (err) => {
    err
    ? console.error(err)
    : console.log(`Note ${idAdd.id} has been added`)
  })
});

app.delete('/api/notes/:id', (req, res) => {
  console.log(req.params);
  let index = dataBase.findIndex((element) => req.params.id === element.id);
  dataBase.splice(index,1);
  fs.writeFile('./db/db.json', JSON.stringify(dataBase,null,2), (err) => {
    err
    ? console.error(err)
    : console.log(`Note ${req.params.id} has deleted`)
  })
})

app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);