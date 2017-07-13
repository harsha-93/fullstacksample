var bodyParser = require('body-parser');	
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://harsha:harsha@ds155192.mlab.com:55192/harsha_todo_app');


//create todo mongoose schema
var todoSchema = new mongoose.Schema({
	item:String
});

var Todo = mongoose.model('Todo',todoSchema);


//save the todo data in db
// var itemOne = Todo({item:'walk'}).save(function(err){
// 	if(err) console.log('error in saving an item:', err);
// 	console.log('item saved successfully');
// })


//create a user mongoose schema
// var userSchema = new mongoose.Schema({
// 	name:String,
// 	occupation:String
// });

// var User = mongoose.model('User',userSchema);

// var userOne = User({name:'harsha',occupation:'engineer'}).save(function(err){
// 	if(err) console.log('error in saving the user:',err);
// 	console.log('user saved successfully');
// })

// var data=[{item:'eat'},{item:'sleep'},{item:'drink'}];

var urlencodedParser = bodyParser.urlencoded({extended:false})

module.exports = function(app){
	
	//get the data from db
	app.get('/todo',function(req,res){		
		Todo.find({}, function(err, data){		
			if(err) throw err;
			console.log('the retrived data is:', data);
			res.render('todo',{todos:data});
		});
	});

	//save the data in db
	app.post('/todo', urlencodedParser, function(req,res){
		var newTodo = Todo(req.body).save(function(err, data){
			if(err) throw err;
			console.log('item is saved');
			res.json(data);
		})
		
	});

	//delete the data in db
	app.delete('/todo/:item',function(req,res){
		console.log(req.params.item, ':params data')
		Todo.find({item:req.params.item.replace(/\-/g, ' ')}).remove(function(err,data){
			if(err) throw err;
			console.log('item is deleted');
			res.json(data);
		})
	});
}