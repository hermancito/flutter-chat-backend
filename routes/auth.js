// path: api/login
const {Router} = require('express');
const {check} = require('express-validator');
const { crearUsuario } = require('../controllers/auth');
const { login } = require('../controllers/auth');
const { renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/new',  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El formato del email no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],crearUsuario);

router.post('/',[
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
], login);

//validarJWT
router.get('/renew', validarJWT, renewToken);

module.exports = router;