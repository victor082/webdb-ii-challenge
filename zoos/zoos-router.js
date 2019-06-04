const knex = require('knex')

const knexConfig = {
    client: "sqlite3",
    connection: {
        filename: './data/lambda.db3',
    },
    useNullAsDefault: true,
}
const router = require('express').Router();
const Zoos = require('./zoos-model.js');

const db = knex(knexConfig)

router.get('/', (req, res) => {
    Zoos.find()
    .then(row => {
        res.status(200).json(row);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'failed to retrieve zoo animal data' })
    })
})

router.get('/:id', (req, res) => {
    Zoos.findById(req.params.id)
    .then(zoos => {
        if (zoos) {
            res.status(200).json(zoos)
        } else {
            res.status(404).json({ message: "zoo not found" })
        }
    })
    .catch(error => {
        res.status(500).json(error);
    })
})

router.post('/', (req, res) => {
    return db('zoos').add(req.body, 'id')
    .then(ids => {
        res.status(201).json(ids)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    Zoos.find()
      .where({ id: req.params.id })
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: `${count} records updated` });
        } else {
          res.status(404).json({ message: 'Role not found' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  router.delete('/:id', (req, res) => {
    Zoos.find()
      .where({ id: req.params.id })
      .del()
      .then(count => {
        if (count > 0) {
          const unit = count > 1 ? 'records' : 'record';
          res.status(200).json({ message: `${count} ${unit} deleted` });
        } else {
          res.status(404).json({ message: 'Animal not found' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
module.exports = router;