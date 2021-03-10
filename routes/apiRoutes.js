const db = require('../db/db.json');
const fs = require('fs');
const uniqid = require('uniqid');
const path = require('path');

module.exports = (app) => {

    app.get('/api/notes', (req, res) => res.json(db));

    app.post('/api/notes', (req, res) => {
        
        let newNote = {
            id: uniqid(),
            title: req.body.title,
            text: req.body.text
        }
        db.push(newNote);

        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(db))
        res.json({ok: true});
        
    })
    app.delete('/api/notes/:id', function (req, res) {
        let targetId = req.params.id;

        // read the db.json file
        // we expect this to be an array
      //  let db = fs.readfile

        // loop through that db array, 
        // find the object that has the targetId
        // remove that object from the db array

        // fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(db))




        res.send('Got a DELETE request at /api/notes/:id')
      })

}