const router = require('express').Router();
const verify = require('../verifyToken');

router.get('/',verify, (req,res) => {
    res.json({
        posts:{
            title: 'my first ppost', 
            description:'random data you shouldn access'}})
});

module.exports = router;