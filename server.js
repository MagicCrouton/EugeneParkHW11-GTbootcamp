const express = require('express');
const app = express()
const path = require('path')
const dataBase = require('./db/db.json')
const PORT = process.env.ExpressPort || 3001;



// middleware
// express static makes a folder available to public
app.use(express.static('public'));

// routes
// this route is for the general connection it will send indexed.html as the preset
// It doesn't seem like i need the first app.get if i use the public folder
app.get('/', (req, res) => res.sendFile(`${__dirname}/public/index.html`));
app.get('/notes', (req, res) => res.sendFile(`${__dirname}/public/notes.html`));

// API call routes
app.get('/api/notes', (req, res) => res.json(dataBase)
);


app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);