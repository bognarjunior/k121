const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();

mongoose.connect('mongodb://localhost/secret');
mongoose.Promise = Promise;

const email = require('../utils/mail');
const Contatos = require('../models/people');

//Find
router.get('/', (req, res, next) => {
    Contatos.find()
        .then( data => res.json(data));
});

//FindId
router.get('/search', (req, res, next) => {

    Contatos.findById(req.query.id, (err, data) => {
        if (err) console.error('error, no entry found');

        res.json(data);
    })
});

//New Post
router.post('/new', (req, res, next) => {

    let item = {
        name: req.body.name,
        email: req.body.email,
    };

    let data = new Contatos(item);

    data.save( err => {
        if (err) {
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

//Post Edit
router.post('/edit',  (req, res, next) => {

    const id = req.body._id;

    Contatos.findById(id, (err, data) => {
        if (err) console.error('error, no entry found');

        data.name = req.body.name;
        data.email = req.body.email;
        data.friend = req.body.friend;

        data.save( err => {
            if (err) {
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

router.post('/delete', (req, res, next) => {
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
router.get('/raffle', (req, res, next) => {

    Contatos.find()
        .then( data => {
            try {
                let update = raffling(data);

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
            } catch (err) {
                let response = {
                    success: true,
                    message: "Algo deu errado com o sorteio!",
                };
                res.status(500).send(response);
            }
        });
});

let raffling = data => {
    try {
        let drawn = [];
        for (let i = 0; i < data.length; i++) {
            drawn.push(data[i].name);
        }

        drawn = getRandon(drawn);

        for (let i = 0; i < data.length; i++) {
            if (i !== data.length - 1) {
                data[i]['friend'] = drawn[i + 1];
            } else {
                data[i]['friend'] = drawn[0];
            }

            if (savefriend(data[i]) == false) {
                return false;
            }
        }

        return true;
    } catch (error) {
        return false
    }
}

let getRandon = array => {
    let n = array.length,
        i,
        j;
    while (n) {
        i = Math.floor(Math.random() * n--);
        j = array[n];
        array[n] = array[i];
        array[i] = j;
    }
    return array;
}

let savefriend = obj => {

    Contatos.findById(obj._id, (err, data) => {
        if (err) return false;

        data.friend = obj.friend;
        data.save( err => {
            if (err) {
                return false;
            } else {
                email.sendMailSecret(data.email, data.name, data.friend);
                return true;
            }
        });
    })
}

module.exports = router;