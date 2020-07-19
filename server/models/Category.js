const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Categories'}
})

module.exports = mongoose.model('Categories',schema)