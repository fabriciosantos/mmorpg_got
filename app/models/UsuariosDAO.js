function UsuariosDAO(connection) {
    this._connection = connection();
}
UsuariosDAO.prototype.inserirUsuario = function(usuario) {
    this._connection.open(function(error, mongoClient) {
        mongoClient.collection("usuarios", function(error, collection) {
            collection.insert(usuario);
            mongoClient.close();
        })
    });
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res) {
    this._connection.open(function(error, mongoClient) {
        mongoClient.collection("usuarios", function(error, collection) {
            collection.find({ usuario: usuario.usuario, senha: usuario.senha }).toArray(function(error, result) {
                if (result[0] != undefined) {
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }

                if (req.session.autorizado) {
                    res.redirect("jogo");
                } else {
                    res.render("index", { validacao: [{ msg: 'Usuario não cadastrado ou senha invalida.' }] });
                }
            });
            mongoClient.close();
        })
    });
}

module.exports = function() {
    return UsuariosDAO;
}