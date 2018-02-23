/**
 * 
 * Arquivo: people.js
 * Author: Bognar Junior
 * Descrição: Arquivo responsável pela modelagem da classe people
 * Data: 23/02/2018
 * 
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peopleSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    friend: { type: String, required: false },
}, { collection: 'contatos' });

module.exports = mongoose.model('People', peopleSchema);