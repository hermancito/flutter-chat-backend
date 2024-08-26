const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    online:{
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function(){
    const{__v, _id, password, ...object}=this.toObject();//metemos en el objeto json 'object' todas las key menos __v, _id y password
    object.uid = _id //renombramos en la vista del json la key _id por uid
    return object;
});

module.exports = model('Usuario', UsuarioSchema);