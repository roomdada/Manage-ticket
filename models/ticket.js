const db = require('./db');

class Ticket {
  static create(full_name, support, description, callback) {
    db.query('INSERT INTO tickets SET full_name = ?, support = ?, description = ?', [
      full_name, support, description
    ], (error, res) => {
      if (error) throw error
      callback(res)
    })
  }
}

module.exports = Ticket;
