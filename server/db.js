const mysql = require('mysql')

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'smilegate',
      port: 3306,
      database: 'short_url'
    })
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      const connection = this.pool.getConnection((err, connection) => {
        if(err) return reject(err)
        connection.query(sql, args, (err, rows) => {
          if(err) return reject(err)
          connection.release()
          resolve(rows)
        })
      })
    })
  }
}

module.exports = Database
