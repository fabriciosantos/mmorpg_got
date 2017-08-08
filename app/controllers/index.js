module.exports.cadastro = function(application, req, res) {
    res.render('index', { validacao: {} });
}

module.exports.autenticar = function(application, req, res) {
    var dados = req.body;

    req.assert('usuario', 'Usuario obrigatorio').notEmpty();
    req.assert('senha', 'Senha obrigatorio').notEmpty();

    var erros = req.validationErrors();
    if (erros) {
        res.render("index", { validacao: erros });
        return;
    }

    var conn = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(conn);

    UsuariosDAO.autenticar(dados, req, res);

}