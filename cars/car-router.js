  
const express = require('express');


const db = require('../data/db-config.js');


const router = express.Router();


router.get('/', (req, res) => {
    // cars is the name of the table i need to get
    db('cars')
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to retrieve the cars from the database' });
        });
});

router.post('/', (req, res) => {
    const carData = req.body;

    db('cars').insert(carData)
        .then(ids => {
            db('cars').where({ id: ids[0] })
                .then(newCar => {
                    res.status(201).json(newCar);
                });
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to create the car and add it to the database' });   
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('cars').where('id', id).del()
        .then(count => {
            res.status(200).json({ deleted: count });
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to delete car from the database' });
        });
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('cars').where({id}).update(changes)
        .then(count => {
            res.json({ updated: count });
        })
        .catch(err => {
            res.status(500).json({ message: 'Unable to update the car' });
        });
    
});


module.exports = router;