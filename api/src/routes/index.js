const { Router } = require('express');
const { getVideogames } = require('../controllers/getVideogames');
const { getVideogameById } = require('../controllers/getVideogameById');
const { getVideogameByName } = require('../controllers/getVideogameByName');
const { getGenres } = require('../controllers/getAllGenres');
const { createVideoGame } = require('../controllers/postVideogames');

const router = Router();

router.get("/videogames", (req, res)=>{
    getVideogames(req, res)
});

router.post('/createvideogame', (req, res) => {
    createVideoGame(req, res);
});

router.get("/videogames/:id", (req, res)=>{
    getVideogameById(req, res)
});

router.get("/videogames/search/:name", (req, res) => {
    getVideogameByName(req, res)
});

router.get('/genres', (req, res) => {
    getGenres(req, res);
  });


module.exports = router;
