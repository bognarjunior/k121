const express = require('express');
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');
const email = require('./mail');

mongoose.connect('mongodb://localhost/secret');  
const Schema = mongoose.Schema;  

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const porta = process.env.PORT || 3000;

const userSchema = new Schema({  
    name: {type: String, required: true},  
    email: {type: String, required: true},
    friend: {type: String, required: false},
}, {collection: 'contatos'}); 

const Contatos = mongoose.model('UserData', userSchema);

//Find
router.get('/', function(req, res, next) { 
    Contatos.find()  
        .then(function(data) {  
            res.json(
                data
            );  
        });  
});

//FindId
router.get('/search', function(req, res, next) { 

    Contatos.findById(req.query.id, function(err, data) {  
        if (err) {  
            console.error('error, no entry found');  
        }
        res.json(
            data
        ); 
    })  
});

//New
router.get('/new', function(req, res, next) {  
    res.render('new');  
});

//New Post
router.post('/new', function(req, res, next) {  

    let item = {  
       name: req.body.name,  
       email: req.body.email,  
    };  
  
    let data = new Contatos(item);  
    data.save(function (err) {
        if (err){
            res.json({
                success: false,
                err
            }); 
        } else {
            res.json({
                success: true,
                data
            }); 
        }
    }); 
});

//Edit
router.get('/edit', function(req, res, next) {  
    res.render('edit');  
});

//Post Edit
router.post('/edit', function(req, res, next) {  
    
    const id = req.body._id;  
  
    Contatos.findById(id, function(err, data) {  
        if (err) {  
            console.error('error, no entry found');  
        }
        
        data.name = req.body.name;  
        data.email = req.body.email;  
        data.friend = req.body.friend;  
        data.save(function (err) {
            if (err){
                res.json({
                    success: false,
                    err
                }); 
            } else {
                res.json({
                    success: true,
                    data
                }); 
            }
        });   
    })   
});  
  
router.get('/delete', function(req, res, next) {  
    res.render('delete');  
});  
  
router.post('/delete', function(req, res, next) { 
    let id = req.body._id;  
    Contatos.findByIdAndRemove(id, (err, cont) => {  

        let response = {
            success: true,
            message: "Removido com sucesso!",
            id: cont._id
        };
        res.status(200).send(response);
    }).exec(); 
}); 

//Edit
router.get('/raffle', async  function(req, res, next) {  

    Contatos.find() 
    .then(function(data) {
        try{
            let update =  raffling(data);
            
            if (!update) {
                let response = {
                    success: true,
                    message: "Algo deu errado com o sorteio!",
                };
                res.status(500).send(response);
            } else {
                let response = {
                    success: true,
                    message: "Sorteio realizado com sucesso!",
                };
                res.status(200).send(response);
            }
        } catch(err) {
            let response = {
                success: true,
                message: "Algo deu errado com o sorteio!",
            };
            res.status(500).send(response); 
        }
        

    });
});  

async function raffling (data) {
    try {
        let drawn = [];
        for(let i = 0; i < data.length; i++) {
            drawn.push(data[i].name);
        }
    
        drawn = getRandon(drawn);
    
        for(let i = 0; i < data.length; i++) {
            if(i !== data.length -1) {
                data[i]['friend'] = drawn[i + 1];
            } else {
                data[i]['friend'] = drawn[0]; 
            } 
    
            if( savefriend(data[i]) == false ) {
                return false;
            }
        }
    
        return true;
    } catch (error) {
        return false
    }
    
}

function getRandon(array) {
    let n = array.length, 
        i, 
        j;
    while(n) {
        i = Math.floor(Math.random() * n--);
        j = array[n];
        array[n] = array[i];
        array[i] = j;
    } 
    return array;
}

async function savefriend(obj) {

    Contatos.findById(obj._id, function(err, data) {  
        if (err) {  
            return false; 
        }
  
        data.friend = obj.friend;  
        data.save(function (err) {
            if (err){
                return false; 
            } else {
                email.sendMailSecret(data.email, data.name , data.friend );
                return true;
            }
        });   
    }) 
}


app.use('/api', router);

app.listen(porta, function () {
    console.log('Servidor rodando na porta: ' + porta +"!");
});