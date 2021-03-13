let db = require('../db/db.json');
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

        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), (err) =>{
          if (err) throw err;
          res.json({ok: true});
        });         
        
    })
    app.delete('/api/notes/:id', function (req, res) {
        let targetId = (req.params.id);
        let newdb;

        fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err) => {
          if (err) throw err;          
          });

        console.log(`Deleting note with id ${targetId}`);        
        db = db.filter(newNote => {
          return newNote.id !== targetId;
        
        })
        console.log(db); 
        
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(db), (err) => {
          if (err) throw err;
          res.json({ok: true})
        });        
    })

}