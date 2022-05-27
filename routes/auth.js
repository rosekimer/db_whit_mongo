const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../validation');


router.post('/register', async (req,res) => {

        // LEST VALICATE THE DATA BEFORE WE A USER
        // const {error} = schema.validate(req.body); secuencia original
        // res.send(error.details[0].message);
        //const {error} = schema.validate(req.body);

        //LET VALIDATE THE DATA BEFORE WE A USER
        const { error } = registerValidation(req.body);
           if (error) return res.status(400).send(error.details[0].message);

        //Checking if the user is already in the database
        const emailExist = await User.findOne({email: req.body.email});
        if (emailExist) return res.status(400).send('Email already exists');

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id}); 
    }catch(err){
        res.status(400).send(err);
    }
});
//LOGIN
router.post('/login', async (req,res) => {
//LETS VALIDATE THE DATA BEFORE WE A USER
const { error } = loginValidation(req.body);
if (error) return res.status(400).send(error.details[0].message);
 //Checking if the user is already in the database
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email is not found');
    //PASSWORD IS CORRECT
    const validPas = await bcrypt.compare(req.body.password, user.password);
    if (!validPas) return res.status(400).send('Invalid Password');
    
    res.send('logged in!');

});



module.exports = router;
