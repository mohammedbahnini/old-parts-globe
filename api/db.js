const mysql = require('mysql');

const config = {
    connectionLimit: 10,
    host: '72.9.135.10',
    user: 'era_creator',
    password: 'Gu35T_2020',
    database: 'era_auto_parts'
};

const pool = mysql.createPool(config);

module.exports = pool;