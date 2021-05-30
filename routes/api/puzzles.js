const express = require('express');
const router = express.Router();
const puzzlesCtrl = require('../../controllers/puzzles');
const multer = require('multer');
const upload = multer();

// /*---------- Public Routes ----------*/
router.post('/', upload.single('photo'), puzzlesCtrl.create)
router.get('/:id', puzzlesCtrl.show)
router.get('/', puzzlesCtrl.index)
router.delete('/:id', puzzlesCtrl.deletePuzzle)


/*---------- Protected Routes ----------*/


module.exports = router;