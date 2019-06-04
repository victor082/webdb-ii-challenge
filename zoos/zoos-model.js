const knex = require('knex')

const knexConfig = {
    client: "sqlite3",
    connection: {
        filename: './data/lambda.db3',
    },
    useNullAsDefault: true,
}

const db = knex(knexConfig)

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
  };

  function find() {
    return db('zoos');
  }
  
  function findById(id) {
    return db('zoos')
      .where({ id })
      .first();
  }
  
  function add() {
    return db('zoos');
  }
  
  function update(id, changes) {
    return null;
  }
  
  function remove(id) {
    return null;
  }

  