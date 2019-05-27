var mysql = require('mysql');

module.exports.connection = () => {
    var connection = mysql.createConnection({
        host: 'den1.mysql6.gear.host',
        user: 'sneaker',
        password: 'phuc1997@',
        database: 'sneaker',

        // multipleStatements : true
    });
   
    connection.connect((error) => {
        if (error) {
            console.log('DB connection failed \n Error : ' + JSON.stringify(error));
        }
        else {
            console.log('Connect to DB successfully...');
        }
    });

    return connection;
}