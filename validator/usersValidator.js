const Joi = require('@hapi/joi');

const registerValidator = data => {
    const schema = Joi.object({

        username: Joi.string().required().min(6),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    
    })
    return schema.validate(data);
}

const loginValidator = data => {
    const schema = Joi.object({

        username: Joi.string().required(),
        password: Joi.string().required(),
    
    })
    return schema.validate(data);
}



module.exports = {registerValidator, loginValidator};