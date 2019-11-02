var bodyParser = require('body-parser');
var multer  =   require('multer');
var mongoose = require('mongoose');
var path = require('path'),
    os = require('os'),
    fs = require('fs');    
const { spawn } = require('child_process');

// Connect to the database
mongoose.connect('mongodb+srv://johnharmon96:Z!pp030405@cluster0-dtl07.mongodb.net/Web-Scraper?retryWrites=true&w=majority', { useNewUrlParser: true })

// Create a schema - this is like a blueprint
var pythonScriptsSchema = new mongoose.Schema({
    item: String
});

var scriptParametersSchema = new mongoose.Schema({
    key: String,
    Group: String,
    value: String
});

var python_scripts = mongoose.model('pythonScripts', pythonScriptsSchema);
var script_parameters = mongoose.model('script-parameters', scriptParametersSchema);

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick butt'}];
var urlencodedParser = bodyParser.urlencoded({ extended: true});
var jsonParser = bodyParser.json({extended: true});

// File upload functions
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, '/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage : storage}).single('file');


// Start server logic
module.exports = function(app){

    app.use(bodyParser.json());
    //app.use(multer());

    app.get('/', function(req, res){
        res.render('index', {page:'Home', menuId:'home'});
    });
        

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////          Python         ///////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.get('/python', function(req, res){
        //get data from mongodb and pass it to view
        python_scripts.find({}, function(err, data){
           if (err) throw err;
            res.render('python-edit', {todos: data});   
        });
        
    });


    app.get('/python/options/edit', function(req, res){
        //get data from mongodb and pass it to view
        python_scripts.find({}, function(err, data){
           if (err) throw err;
            res.render('python-edit', {todos: data});   
        });
        
    });

    app.post('/python/options/edit', urlencodedParser,function(req, res){
        //get data from the view and add it to mongodb
        var newTodo = python_scripts(req.body).save(function(err,data){
           if (err) throw err;
           res.json(data);
        });
    });

    app.get('/python/options/view', function(req, res){
        //get data from mongodb and pass it to view
        python_scripts.find({}, function(err, data){
           if (err) throw err;
            res.render('python-view', {todos: data});   
        });
        
    });
    
    app.get('/python/parameters/:script', function(req, res){
        //get data from mongodb and pass it to view
        script_parameters.find({}, function(err, data){
            if (err) throw err;
            var script = req.params.script
            //const status = "inactive";
            res.render('parameters', {script_params: data, script: script});
        })
        
    });

    // Handle file transfer
    app.post('/document', function(req, res, next){
        //upload.single('file')
        const files = req.files
        if (!files) {
            console.log('Please Choose files');
        }
            console.log('File recieved.');

        upload(req, res, function(err) {
            if(err){
                return res.end("Error uploading file.");
            }   
                res.end("File is uploaded.");
        });


        // let form = new multiparty.Form();
        // form.parse(req);
        // form.on('part', (part) => {
        //     parent.pipe(createWriteStream(`./${part.filename}`))
        //     .on('close', () => {
        //         res.writeHead(200, { 'Content-Type': 'text/html'});
        //         res.end(`<h1>File uploaded: ${part.filename}</h1>`)
        //     })
        // })


        // req.pipe(req.busyboy);
        
        // req.busboy.on('file', function(fieldname, file, filename) {
        //     console.log('We are streaming!');
        //     var saveTo = path.join(__dirname, 'uploads', path.basename(fieldname));
        //     fstream = fs.createWriteStream(saveTo);
        //     console.log(fstream);
        //     file.pipe(fstream);
        //     fstream.on('close', function (){
        //         res.send('Success');
        //     });
        // });
    });

    app.post('/python/parameters/:item', function(req, res){
        
            app.use(bodyParser.json());

            const data = req.body;
            console.log(data);
            console.log(data.pythonScript)
            //const status = "";
            const filePath = 'Main.exe';
            const bat = spawn('cmd.exe', ['/c', filePath, data.URL, data.username, data.password, data.Direction, data['Cost Structure'], data['New Cost Structure']]);

            bat.stdout.on('data', (data) => {
                console.log(data.toString());
                //status = data.toString();
            });

            bat.stderr.on('data', (data) => {
                console.log(data.toString());
            });
            
            bat.on('exit', (code) => {
                console.log(`Child exited with code ${code}`);
                //if (code == 0){
                //    res.render('parameters', {script_params: data, script: script});
                //};
            });
    });

    app.delete('/python/options/edit/:item', function(req, res){
        //delete the requested item from mongodb
        python_scripts.find({item: req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////          Automated Analyst         ////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    //Landing page for AA
    app.get('/IMU/AUTOMATEDANALYST', function(req, res){
        res.render('aa');   
    });

};