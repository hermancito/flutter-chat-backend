const {response} = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response)=>{

    const usuarios = await Usuario
        .find({_id:{$ne:req.uid}}) //encontrar todos los usuarios menos el usuario autenticado, del que tenemos el uid
        .sort('-online');

    res.json({
        ok:true,
        usuarios
    })
}

module.exports = {
    getUsuarios
}