const {Schema, model} = require('mongoose');

const MensajeSchema = Schema({
    de:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario',
    },
    mensaje:{
        type:String,
        required: true
    }
 }, {
    timestamps:true
 }
);

MensajeSchema.method('toJSON', function(){
    const{__v, _id, ...object}=this.toObject();//metemos en el objeto json 'object' todas las key menos __v, _id y password
    //object.uid = _id //renombramos en la vista del json la key _id por uid
    return object;
});

module.exports = model('Mensaje', MensajeSchema);