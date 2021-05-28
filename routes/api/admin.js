const express = require('express');
const router = express.Router();
const adminCtrl = require('../../controllers/admin');


/*---------- Public Routes ----------*/
router.post('/login', adminCtrl.login);

/*---------- Protected Routes ----------*/


module.exports = router;