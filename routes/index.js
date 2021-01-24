var express = require('express');
var router = express.Router();

/* GET home page. */

router.get("/addcontact", function(req, res, next) {
 res.render('addcontact', { title: 'Rentomojo Phonebook' });
    
})



module.exports = router;