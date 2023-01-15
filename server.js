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
  fs.writeFile('./db/db.json', JSON.stringify(dataBase), (err) => {
    console.log(err);
  })
});

app.delete('/api/notes/:id', (req, res) => {
  console.log(req);
})

app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);