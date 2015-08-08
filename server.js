var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
//mongo database and collection
var db = mongojs('mydb', ['quote']);
/*
app.get('/', function(req, res){
	res.send("Hello world from server.js")
});
*/
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//get route listens for request for data
app.get('/quotelist', function(req,res){
	console.log("recevied a GET request");
/*
	//dummy data
	quote1 = {
		quote: 'Red apples are delish.',
		author: 'Tim',
		category: 'Food'
	};
	var contactlist = [quote1,quote2,quote3];
	//respond by sending data vis json
	res.json(contactlist)
*/
	db.quote.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})
});

//post route listens for incomming data
app.post('/quotelist', function(req,res){
	console.log('POST route is reached in console');
	console.log(req.body);

	db.quote.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

//delete route deletes from db
app.delete('/quotelist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	//remove obj by id in mongo
	db.quote.remove({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
})

app.get('/quotelist/:id', function(req,res){
	var id = req.params.id;
	console.log(id);
	db.quote.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
})

app.put('/quotelist/:id', function(req,res){
	var id = req.params.id;
	console.log(req.body.quote);
	db.quote.findAndModify(
		{
			query: {_id: mongojs.ObjectId(id)},
			update: {$set: {quote: req.body.quote,author: req.body.author,category: req.body.category}}, 
			new: true
		}, function (err, doc) {
			res.json(doc);
		})
});

app.listen(3000);
console.log("Server running on port 3000 captinn")