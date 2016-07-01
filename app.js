var express = require('express');
var path=require('path');
var bodyParser = require('body-parser');
var multer  = require('multer');
var upload = multer({dest:'./uploads/'});


var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'views')));

app.post('/avatar',upload.single('avatar'),function(req, res) {
    console.log(upload.single('avatar'));
    console.log(req.file);
    res.status(200).json({ file: req.file});
});

app.listen(3000,function(){
	console.log('服务已启动...')
})