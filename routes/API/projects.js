const express = require('express');
const router = express.Router();
const Project = './../../models/project.js'

router.post('/new', async (req, res) => {

    console.log(req.body)
    // console.log('here');

    // res.json(null);

    // try {
    //     const game = await Game.findOne({key: req.params.key});
    //     const word = new Word({
    //         value: req.params.word
    //     });
    //     game.words.push(word);
    //     await game.save();
    //     res.json(word);
    // } catch (error) {
    //     res.status(500).json({ message: error.message })
    // } 
});

module.exports = router;
