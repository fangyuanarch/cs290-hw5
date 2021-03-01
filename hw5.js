var express = require('express')
var app = express()
var handlebars = require('express-handlebars').create({defaultLayout:'main'})
var bodyParser = require('body-parser')

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.set('port', 3000)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/',function(req,res){
  res.render('home')
})

app.get('/requests',function(req,res){
  var input1 = []
  for (var i in req.query){
    input1.push({"name":i, "value":req.query[i]})
  }
  var context = {}
  context.dataList = input1
  res.render('requests', context)
})

app.post('/requests',function(req,res){
  var input3 = []
  for (var i in req.query){
    input3.push({"name":i, "value":req.query[i]})
  }
  var context = {}
  context.dataList3 = input3

  var input2 = []
  for (var i in req.body){
    input2.push({"name":i, "value":req.body[i]})
  }
  context.dataList2 = input2
  res.render('requests2', context)
})


app.use(function(req,res){
  res.status(404)
  res.render('404')
})

app.use(function(err, req, res, next){
  console.error(err.stack)
  res.type('plain/text')
  res.status(500)
  res.render('500')
})

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
})
