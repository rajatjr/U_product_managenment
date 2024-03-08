const Joi = require("joi");

const validateUser = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string(),
        password: Joi.string().required()
    })

    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(200).json({ success: false, msg: error.details[0].message });
    }
    else {
        next();
    }
}

module.exports = validateUser;