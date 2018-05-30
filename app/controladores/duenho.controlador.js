const Duenho = require('../modelos/duenho.modelo.js');

// Create and Save
exports.create = (req, res) => {
    // Validate request
    if(!req.body.documento | !req.body.nombre | !req.body.user | !req.body.pass ) {
        return res.status(400).send({
            message: "Complete los datos del dueño"
        });
    }

    // Create
    const admin = new Duenho({
        documento: req.body.documento,
        nombre: req.body.nombre,
        genero: req.body.genero || "NN",
        edad: req.body.edad || 18,
        user: req.body.user,
        pass: req.body.pass
    });

    // Save
    admin.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error Creando Dueño"
        });
    });
};

// -----------------------------------------------------------------------------

// Traer todos los dueños
exports.findAll = (req, res) => {
    Duenho.find()
    .then(duenhos => {
        res.send(duenhos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Problema al traer los dueños"
        });
    });
};

// -----------------------------------------------------------------------------

// Traer un dueño
exports.findOne = (req, res) => {
    Duenho.findById(req.params.duenhoId)
    .then(duenho => {
        if(!duenho) {
            return res.status(404).send({
                message: "dueño no encontrado con id " + req.params.duenhoId
            });            
        }
        res.send(duenho);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "dueño no encontrado con id " + req.params.duenhoId
            });                
        }
        return res.status(500).send({
            message: "error trayendo dueño con id " + req.params.duenhoId
        });
    });
};

// -------------------------------------------------------------------------------------------

// Traer todos los terrenos del dueño
exports.findTerrenos = (req, res) => {
    Duenho.findById(req.params.duenhoId)
    .then(duenho => {
        if(!duenho) {
            return res.status(404).send({
                message: "dueño no encontrado con id " + req.params.duenhoId
            });            
        }
        res.send(duenho.terrenos);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "dueño no encontrado con id " + req.params.duenhoId
            });                
        }
        return res.status(500).send({
            message: "error trayendo terrenos del dueño con id " + req.params.duenhoId
        });
    });
};

// ------------------------------------------------------------------------------------

// Update a duenho identified by the Id in the request
exports.addTerrenos = (req, res) => {

    if(!req.body.duenhoId | !req.body.terrenos) {
        return res.status(400).send({
            message: "Envíe el Id del dueño y sus terrenos a agregar"
        });
    }

    Duenho.findByIdAndUpdate(req.body.duenhoId, {
        terrenos: req.body.terrenos
    }, {new: true})
    .then(duenho => {
        if(!duenho) {
            return res.status(404).send({
                message: "Dueño no encontrado con id " + req.params.duenhoId
            });
        }
        res.send(duenho);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Dueño no encontrado con id " + req.params.duenhoId
            });                
        }
        return res.status(500).send({
            message: "error actualizando dueño con id " + req.params.duenhoId
        });
    });
};

// -------------------------------------------------------------------------

// Traer un dueño
exports.login = (req, res) => {
    Duenho.find()
    .then(duenhos => {

        for (var d = 0; d < duenhos.length; d++) {
            if(duenhos[d].user == req.body.user & duenhos[d].pass == req.body.pass)
                 res.send(duenhos[d]);
        }
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Problema encontrar usuario"
        });
    });
};