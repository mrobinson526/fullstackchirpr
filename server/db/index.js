const mysql = require('mysql');
const pool = mysql.createPool ({
    connectionLimit: 10,
    password: '$pswdtest2021',
    user: 'chirprapp',
    database: 'chirpr',
    host: 'localhost',
    port: '3306'
});

let chirprdb = {};
chirprdb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('select * from chirps', (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};
chirprdb.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('select * from chirps where id = ?', [id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
}

module.exports = chirprdb;