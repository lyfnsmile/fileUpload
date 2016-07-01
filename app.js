var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'temp/' });
var fs = require('fs');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public')));
app.post('/avatar', upload.single('file'), function(req, res) {
    console.log(req.file);
    var tmp_path = req.file.path;
    var target_path = 'uploads/' + req.file.originalname;
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    res.status(200).json({ file: req.file });
});

app.listen(3000, function() {
    console.log('服务已启动...')
})
