require('dotenv').load();


// Load the Cloudant library.
var Cloudant = require('cloudant');
var express = require('express');
var app = express();
var http = require('http');

// Initialize Cloudant with settings from .env
var username = process.env.cloudant_username || "miracle";
var password = process.env.cloudant_password;

var port = process.env.PORT || 8080;
var host = process.env.HOST;

var cloudant = Cloudant({
  account: username,
  password: password
});

app.use(express.static(__dirname + '/public', {
  index: 'Create.html'
}));

app.get('/create', function(req, res) {
  var bname = req.query.b;
  var bauthor = req.query.b1;
  var bid = req.query.b2;
  var btitle = req.query.b3;
  var bvolume = req.query.b4;
  var bkeywords = req.query.b5;
  var bpages = req.query.b6;
  var obj = {
    _id: bid,
    dname: bname,
    dauthor: bauthor,
    dtitle: btitle,
    dvolume: bvolume,
    dkeywords: bkeywords,
    dpages: bpages
  };
  // Remove any existing database called "alice".


  // Create a new "alice" database.
  cloudant.db.create('inserting', function() {

    // Specify the database we are going to use (alice)...
    var alice = cloudant.db.use('inserting');
    console.log("hi");
    // ...and insert a document in it.
    alice.insert(obj, function(err) {
      if (err) {
        return console.log('[alice.insert] ', err.message);
      }

      console.log('You have inserted the rabbit.');
      res.send("Inserted Successfully");

    });
  });
});
app.get('/delete', function(req, res) {
  var email1 = req.query.ss;
  var alice = cloudant.db.use('inserting');
  console.log(email1);
  var bb = {
    "selector": {
      _id: email1
    }
  };

  console.log(bb);
  alice.find(bb, function(err, result) {
    if (err)
      throw err;
    var obb = result.bookmark;
    if (obb === "nil") {
      res.send("no data found");
    } else {
      console.log("result" + JSON.stringify(result));
      var a = result.docs[0]._rev;
      var b = result.docs[0]._id;
      console.log(b);
      var ob1 = JSON.stringify(result);
      console.log(ob1);
      var ob = {
        _id: email1
      };
      console.log(a);
      console.log(ob);
      alice.destroy(b, a, function(err) {
        console.log("stated");
        if (err) {
          throw err;
        }
        console.log("deleted");
        res.send("Deleted Successfully");
      })
    }
  })


});
app.get('/ret', function(req, res) {
  var id = req.query.ss;
  console.log("hai" + id);
  var alice = cloudant.db.use('inserting');
  var bb = {
    "selector": {
      _id: id
    }
  };
  console.log(bb);
  alice.find(bb, function(err, result) {
    if (err)
      throw err;
    var obb = result.bookmark;
    if (obb === "nil") {
      res.send("no data found");
    } else {
      console.log("result" + JSON.stringify(result));

      var id1 = result.docs[0]._id;
      var name = result.docs[0].dname;
      var author = result.docs[0].dauthor;
      var title = result.docs[0].dtitle;
      var volume = result.docs[0].dvolume;
      var keywords = result.docs[0].dkeywords;
      var pages = result.docs[0].dpages;
    
      res.send(result)
    }
  })


});
app.get('/update', function(req, res) {
  var id = req.query.ss;
  console.log(id);
  var alice = cloudant.db.use('inserting');
  var bb = {
    "selector": {
      _id: id
    }
  };
  console.log(bb);
  alice.find(bb, function(err, result) {
    if (err)
      throw err;
    var obb = result.bookmark;
    if (obb === "nil") {
      res.send("no data found");
    } else {
      console.log("result" + JSON.stringify(result));
      var ref = result.docs[0]._rev;
      var id1 = result.docs[0]._id;
      var name = result.docs[0].dname;
      var author = result.docs[0].dauthor;
      var title = result.docs[0].dtitle;
      var volume = result.docs[0].dvolume;
      var keywords = result.docs[0].dkeywords;
      var pages = result.docs[0].dpages;
      res.send(result);
    }
  })
});
app.get('/updatebook', function(req, res) {
  /* var name = req.query.BName;
  var author = req.query.BAuthor;
  var id = req.query.BId;
  var title = req.query.BTitle;
  var volume = req.query.BVolume;
  var keywords = req.query.BKeywords;
  var pages = req.query.BPages;
  var rev =req.query.Brev; */
  var name = req.query.b;
  var author = req.query.b1;
  var id = req.query.b2;
  var title = req.query.b3;
  var volume = req.query.b4;
  var keywords = req.query.b5;
  var pages = req.query.b6;
  var rev = req.query.b7;
  var obj = {
    _id: id,
    _rev: rev,
    dname: name,
    dauthor: author,
    dtitle: title,
    dvolume: volume,
    dkeywords: keywords,
    dpages: pages
  };
  var alice = cloudant.db.use('inserting');
  console.log("hi");
  // ...and insert a document in it.
  alice.insert(obj, function(err) {
    if (err) {
      return console.log('[alice.insert] ', err.message);
    }

    console.log('You have inserted the rabbit.');
    res.send("Updated Successfully");
  });
})
/*http.createServer(function(req,res) { 
res.writeHead(200,{'Content-Type' : 'text/plain'}); 
res.end('Hello World from NodeJS'); }).listen(port,host);*/

app.listen(port,host);
