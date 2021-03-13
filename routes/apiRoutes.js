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
        let targetId = (req.params.id);

        fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8');
        console.log(`Deleting note with id ${targetId}`);
        
         let newdb = db.filter(newNote => {
          return newNote.id !== targetId;
        })
        console.log(newdb);
        

        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(newdb))

        res.json(({ok: true}))
      })

}