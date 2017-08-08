var mongo = require('mongodb');

var connMongoDB = function() {
    console.log('Conectou no banco');
    var db = new mongo.Db(
        'mmorpg_got',
        new mongo.Server(
            'localhost',
            27017, {}), {});

    return db;
}

module.exports = function() {
    return connMongoDB;
}