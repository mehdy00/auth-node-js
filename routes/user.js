const router = require('express').Router();
const User = require('../model/User');
const validator = require('../validator/usersValidator');
const usersController = require('../controllers/usersController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Post one User in DB
router.post('/register', async (req, res) => {
    
    // Validator
     const { error } = validator.registerValidator(req.body);
     if(error) return res.status(400).send(error.details[0].message);
    
    // Check if user exists
    if(await usersController.findOneUser(req.body) >= 1) return res.status(409).send("Username or email already exists");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const insertedUser = await usersController.insertUser(req.body, hashedPassword);
        res.status(201).send(insertedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    // Validator
    const { error } = validator.loginValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);    
    
    // Check if username exists
    if(await usersController.findOneUser(req.body) == 0) return res.status(400).send("Check username or password");

    const user = await usersController.findOneUserByUsername(req.body);

    // Chech if password is valid
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Check username or password')

    const token = jwt.sign({ _id: user.id}, process.env.AUTH_TOKEN);
    res.header('auth_token', token);
    res.getHeader();
    res.send("Logged in");
    
});

// Find one user by ID
router.get('/:userId', async (req, res) => {
    try{
        const user = await usersController.findOneUserById(req.params.userId);
        res.json(user);
    }
    catch(err){
        res.json({message: err})
    }
});


module.exports = router;