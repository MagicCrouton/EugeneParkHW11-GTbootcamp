const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const dataBase = require('./db/db.json');
const fs = require('fs');
const { json } = require('express');
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}




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
  idAdd.id = uuidv4();
  dataBase.push(idAdd);
  fs.writeFile('./db/db.json', JSON.stringify(dataBase,null,2), (err) => {
    err
    ? res.json(err)
    : res.json(`Note ${idAdd.id} has been added`)
  })
});

app.delete('/api/notes/:id', (req, res) => {
  console.log(req.params);
  let index = dataBase.findIndex((element) => req.params.id === element.id);
  dataBase.splice(index,1);
  fs.writeFile('./db/db.json', JSON.stringify(dataBase,null,2), (err) => {
    err
    ? res.json(err)
    : res.json(`Note ${req.params.id} has deleted`)
  })
})

app.listen(port, () =>
  console.log(`Listening at http://localhost:${port}`)
);