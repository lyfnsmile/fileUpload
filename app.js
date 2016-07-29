var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'temp/' });
var fs = require('fs');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
// app.post('/avatar', upload.single('file'), function(req, res) {
//     console.log(req.file);
//     var tmp_path = req.file.path;
//     var target_path = 'uploads/' + req.file.originalname;
//     var src = fs.createReadStream(tmp_path);
//     var dest = fs.createWriteStream(target_path);
//     src.pipe(dest);

//     // function dataToImage(dataUrl) {
//     //     var base64Data = dataUrl.split(",")[1];
//     //     var dataBuffer = new Buffer(base64Data, 'base64');

//     //     fs.writeFile('out.jpg', dataBuffer, function(err) {
//     //         if (err) {
//     //             console.log(err);
//     //         } else {
//     //             console.log('Success...');
//     //         }
//     //     });
//     // }


//     res.status(200).json({ file: req.file });
// });




app.post('/avatar',function(req,res){
    console.log(req.body)
    dataToImage(req.body.result)
    res.json(req.body)
})

app.listen(4000, function() {
    console.log('服务已启动...')
})


function dataToImage(dataUrl){
    var base64Data = dataUrl.replace(/^data:image\/\w+;base64,/,'');
    var dataBuffer = new Buffer(base64Data,'base64');

    fs.writeFile('out.jpg',dataBuffer,function(err){
        if(err){
            console.log(err);
        }else{
            console.log('Success...');
        }
    });
}