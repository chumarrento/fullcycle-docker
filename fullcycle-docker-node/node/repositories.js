const mysql = require('mysql');
const mysqlConfig = require('./mysql-config');

async function executeQuery (sql) {
    const connection = mysql.createConnection(mysqlConfig);

    const queryPromise = new Promise((resolve, reject) => {
        connection.query(sql, function (err, rows) {
            if (err) {
                console.log(err)
                reject(new Error('Something went wrong'));
                return;
            }
    
            resolve(rows);
        });
    });
    const result = await queryPromise;
    connection.end()
    return result;
}

module.exports = {
    UserRepository: () => {
        return {
            saveUser: async (name) => {
                const sql = `INSERT INTO users(name) VALUES ("${name}")`;
                executeQuery(sql);
            },
            fetchUsers: async () => {
                const usersResult = await executeQuery('SELECT name from users');
        
                return usersResult.map((row) => ({
                    name: row.name
                }))
            }
        }
    },
}