const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //console.log(client.handshake.headers['x-token']);
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token'])

    //console.log(valido, uid);
    //verificamos autenticacion
    if(!valido){
        return client.disconnect();
    }
    //Cliente autenticado
    console.log('Cliente conectado!!');
    usuarioConectado(uid);

    // Ingresamos al usuario a una sala especifica del socket
    // En la sala global están todos los usuarios
    // Las salas privadas las identificamos con el client.id (uid) de los usuarios
    client.join(uid);//nos conectamos a la sala donde está el usuario

    client.on('mensaje-personal', async(payload)=>{
        //console.log(payload);
        //grabamos el mensaje
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    })

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
