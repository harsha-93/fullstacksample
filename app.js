const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  //set up template engine
	app.set('view engine', 'ejs');


	//set up static files
	app.use(express.static('./public'));


	//call controllers
	todoController(app);


	//set up port
	app.listen(3000, function(){
		console.log('server listening on port 3000')
	})

  console.log(`Worker ${process.pid} started`);
}






