var express = require('express'),
	app = express(),
	juicer = require('juicer'),
	fs = require('fs'),
	bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine','html');

app.engine('html', function(path, options, fn){
	fs.readFile(path, 'utf8', function(err, str){
		if (err) return fn(err);
		str = juicer(str, options);
		fn(null, str);
	});
});

app.get('/', function (req, res) {
  res.render('index',{title: 'Hey', message: 'Hello there!'});
});


app.get('/submit',function(req, res) {
	console.log(req.url);
	console.log(req.body);
	console.log(req.query);
	console.log(req.param("name"));
	res.render('result',{name: req.query.name});
});

app.post('/sub',function(req,res) {
	console.log(req.url);
	console.log(req.body.name);
	console.log(req.query);
	console.log(req.param("name"));
	res.render('result',{name: req.body.name});
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('MyBlog_v2 listening at http://%s:%s', host, port);
});