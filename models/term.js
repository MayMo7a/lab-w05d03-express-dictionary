var db = require('../db/config');
var term = {};

term.getAll = function (req, res, next){
    db.manyOrNone("SELECT * FROM terms;")
    .then(function (result) {
        res.locals.term = result; 
        next();  
    })
    .catch(function(error){
        console.log(error); 
        next();
    })
}
  
term.find = function (req, res, next){
    var id = req.params.id;
    db.oneOrNone("SELECT * FROM terms WHERE id= $1;", [id])
      .then(function(result){
        res.locals.term = result;
        next();
    })
    .catch(function(error){
        console.log(error);
        next();
    })
}

term.create = function(req, res, next){
    console.log(req.body);
    db.one( `INSERT INTO terms (name, definition) VALUES ($1, $2) RETURNING id;`,[req.body.name, req.body.definition])
      .then(function (result) {
        console.log(result);
        res.locals.term_id = result.id;
        next();
      })
      .catch(function (error) {
        console.log(error);
        next();
      })
}
term.update = function(req, res, next){
    db.one(`UPDATE terms SET name= $1, definition= $2 RETURNING id;`,
      [req.body.name, req.body.definition, req.params.id])
        .then(function(result){
          res.locals.term_id = result.id;
          next();
        })
        .catch(function(error){
          console.log(error);
          next();
        })
    }

term.delete = function(req, res, next){
    db.none("DELETE FROM terms WHERE id= $1;", [req.params.id])
    .then(function(){
      console.log('succesful');
      next();
    })
    .catch(function(error){
      console.log(error);
      next();
    })
  }

module.exports = term;