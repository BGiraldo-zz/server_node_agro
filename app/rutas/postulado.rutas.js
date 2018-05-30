module.exports = (app) => {
    const postulados = require('../controladores/postulado.controlador.js');

    // Registra un postulados
    app.post('/postulados', postulados.create);

    // Trae todos los postulados registrados
    app.get('/postulados', postulados.findAll);

    // Trae un postulados por su ID
    app.get('/postulados/:postuladoId', postulados.findOne);

    // Trae los terrenos en los que esta postulado
    app.get('/postulado-terrenos/:postuladoId', postulados.terrenosPostulado);


}