var express = require('express');
var router = express.Router();
var app = new express();
var mongojs = require('mongojs');
var db = mongojs('mongodb://user:pw@ds215910.mlab.com:15910/g_diary', ['boards']);
var bodyParser = require('body-parser');



app.use(express.static(__dirname+ "/public"));
app.use(bodyParser.json());


app.get('/board', function(req, res){ // FIND the DATA LIST
	db.boards.find(function(err, boards){
		if(err){
			res.send(err);
		}
		res.json(boards);
	});
});

app.get('/board/:id', function(req, res, next){
	db.boards.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, board){
		if(err){
			res.send(err);
		}
		res.json(board);
	});
});

app.post('/board', function(req, res, next){
	var task = req.body;
	db.boards.insert(task, function(err, task){
		if(err){
			res.send(err);
		}else{
			res.json(task);
		}
	});
});

app.delete('/board/:id', function(req, res){ // FIND the DATA LIST
	db.boards.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, board){
		if(err){
			res.send(err);
		}
		res.json(board);
	});
});


app.put('/board/:id', function(req, res, next){
	var board = req.body;
	var updBoard = {};
	updBoard.title = board.title;
	updBoard.author = board.author;
	updBoard.content = board.content;
	updBoard.date = Date.now();

	if(!updBoard){
		res.status(400);
		res.json({
			"error":"Bad Data"
		});
	}else{
		db.boards.update({_id: mongojs.ObjectId(req.params.id)}, updBoard, {}, function(err, board){
			if(err){
				res.send(err);
			}
			res.json(board);
		});		
	}

});






app.listen(3000);
console.log("Server running on pot 3000");
console.log("this one called");