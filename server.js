const path = require('path');
const http = require('http');
const express = require('express');
const fsPromises = require("fs").promises;

/* Asynchronní funkce pro načtení JSON souboru */
async function readJSON(path) {
    const data = await fsPromises
      .readFile(path, 'utf-8')
      .catch(err => console.error("Failed to read file", err));
    return JSON.parse(data.toString());
  }

/* Test
readJSON('data/events.json')
    .then(data => console.log(data))
    .catch(err => console.error('Nemám data', err));
*/

const app = express();
const server = http.createServer(app);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.get("/api/places", (req, res) => {
    readJSON('data/mista.json')
    .then(data => res.send(data))
    .catch(err => res.send('Soubor nebylo možné načíst', err));       
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));