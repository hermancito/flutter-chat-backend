const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { body } = require('express-validator');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async (req, res = response)=>{

    const {email, password}=req.body;

    try{
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
        const usuario = new Usuario(req.body);

        //encriptamos contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar mi JWT
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const login = async (req, res = response)=>{

    const {email, password}=req.body;

    try{
        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'E-mail no encontrado'
            });
        }
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Password no válido'
            });
        }
        //Generar mi JWT
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });

        
    }catch(error){
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async(req, res = response)=>{

    const uid = req.uid;
    const token = await generarJWT(uid);
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}