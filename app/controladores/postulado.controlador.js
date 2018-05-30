const Postulado = require('../modelos/postulado.modelo.js');
const Duenho = require('../modelos/duenho.modelo.js');

// Create and Save
exports.create = (req, res) => {
    // Validate request
    if(!req.body.documento | !req.body.nombre | !req.body.user | !req.body.pass ) {
        return res.status(400).send({
            message: "Complete los datos del especialista"
        });
    }

    // Create
    const postulado = new Postulado({
        documento: req.body.documento,
        nombre: req.body.nombre,
        genero: req.body.genero || "NN",
        edad: req.body.edad || 18,
        user: req.body.user,
        pass: req.body.pass
    });

    // Save
    postulado.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error Creando Especialista"
        });
    });
};

// -----------------------------------------------------------------------------

// Traer todos los postulados
exports.findAll = (req, res) => {
    Postulado.find()
    .then(postulados => {
        res.send(postulados);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Problema al traer los especialistas"
        });
    });
};

// -----------------------------------------------------------------------------

// Traer un postulado
exports.findOne = (req, res) => {
    Postulado.findById(req.params.postuladoId)
    .then(postulado => {
        if(!postulado) {
            return res.status(404).send({
                message: "especialista no encontrado con id " + req.params.postuladoId
            });            
        }
        res.send(postulado);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "especialista no encontrado con id " + req.params.postuladoId
            });                
        }
        return res.status(500).send({
            message: "error trayendo especialista con id " + req.params.postuladoId
        });
    });
};

// -----------------------------------------------------------------------------

// Traer terrenos en los que esta suscrito
exports.terrenosPostulado = (req, res) => {

  
    Postulado.findById(req.params.postuladoId)
    .then(postulado => {
        if(!postulado) {
            return res.status(404).send({
                message: "especialista no encontrado con id " + req.params.postuladoId
            });            
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "especialista no encontrado con id " + req.params.postuladoId
            });                
        }
        return res.status(500).send({
            message: "error trayendo especialista con id " + req.params.postuladoId
        });
    });

    Duenho.find()
    .then(duenhos => {

        var terrenosPostulado = [];

        for (var d = 0; d < duenhos.length; d++) {
            var terrenos = duenhos[d].terrenos;

                for (var i = 0; i < terrenos.length; i++) {
                    for (var j = 0; j < terrenos[i].postulados.length; j++){
                        if(terrenos[i].postulados[j]._id == req.params.postuladoId){
                            terrenosPostulado.push(terrenos[i]);
                        }
                    }
                 }
            }
           
        res.send(terrenosPostulado);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Problema al traer los terrenos donde está postulado"
        });
    });
};