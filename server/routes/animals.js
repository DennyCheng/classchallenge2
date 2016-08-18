var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';

router.get('/',function(req,res){
  console.log("at get request");
  pg.connect(connectionString,function(err,client,done){
    if(err){
      res.sendStatus(500);
    }
    client.query('SELECT * FROM animals',function(err,result){
      done();

      if(err){
        console.log("we get an error");
        res.sendStatus(500);
      }
      console.log("we are res send");
      res.send(result.rows);
    });
  });
});

router.get('/',function(req,res){
  pg.connect(connectionString,function(err,client,done){
    if(err){
      res.sendStatus(500);
    }
    client.query('SELECT * FROM books',function(err,result){
      done();

      if(err){
        res.sendStatus(500);
      }
      res.send(result.rows);
    });
  });

});

router.post('/',function(req,res){
  var animal = req.body;
  console.log(animal);

  pg.connect(connectionString, function(err,client,done){
    if(err){
      res.sendStatus(500);
    };
    client.query('INSERT INTO animals(name, amount)'
    //name is different than the "type" column i created on the database.txt
    //I kept it as name vs changing it to type since I originally incorrectly labled my SQL server.
      +'VALUES($1,$2)',
      [animal.type,animal.amount],
        function(err,result){
          done();
          if (err){
            res.sendStatus(500);
          }
          else{res.sendStatus(201);
        }
        });
  });
});



module.exports = router;
