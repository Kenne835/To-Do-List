var express = require('express');
var router = express.Router();
var pg = require('pg');

var poolModule = require('../modules/pool.js');

//GET request to send tasks from database to client side:
router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "todolist" ORDER BY "completionstatus" ASC;';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making SELECT * FROM query');
          res.sendStatus(500);
        } else {
          res.send({tasks: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end router.get

//POST request to add new tasks from client side to the database:
router.post('/', function(req, res) {
  var todo = req.body;
  console.log(todo);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'INSERT INTO "todolist" ("task", "completionstatus")' +
      ' VALUES ($1, $2);';
      db.query(queryText, [todo.task, todo.status], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making INSERT INTO query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
}); //end router.post

//DELETE request from client side to remove tasks from the database:
router.delete('/:id', function(req, res){
  var id = req.params.id; // id of the thing to delete
  console.log('Delete route called with id of', id);

  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'DELETE FROM "todolist" WHERE id = $1;';
      db.query(queryText, [id], function(errorMakingQuery, result){
        done(); //VERY IMPORTANT
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making DELETE FROM query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
}); //end router.delete

//PUT request to update completionstatus in the database:
router.put('/', function(req, res){
  var task = req.body;
  console.log('Put route called with task of ', task);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      console.log(task);
      var queryText = 'UPDATE "todolist" SET "completionstatus" = $1 WHERE id = $2;';
      db.query(queryText, [task.status, task.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making UPDATE query');
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
}); //end router.put

module.exports = router;
