module.exports = (app) => {
    const duenhos = require('../controladores/duenho.controlador.js');

    // Crea un nuevo dueño
    app.post('/duenhos', duenhos.create);

    // Traer todos los dueños
    app.get('/duenhos', duenhos.findAll);

    // Traer un dueño por su ID
    app.get('/duenhos/:duenhoId', duenhos.findOne);

    // Traer todos los terrenos de un dueño por su ID
    app.get('/duenho-terrenos/:duenhoId', duenhos.findTerrenos);

    // agregar terrenos al dueño (Actualizar Terrenos)
     app.post('/duenho-terrenos', duenhos.addTerrenos);

     // Busca el usuario que para loguearse
     app.post('/duenho-login', duenhos.login);
}