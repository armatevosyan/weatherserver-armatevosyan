const Joi = require('joi');

const Validators =  {

  createUser: function (user) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      lastName: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required().min(6).max(10).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      confirmPassword: Joi.ref('password'),
      image: Joi.required(),
    });

    return schema.validate(user);
  },

  loginUser: function (user) {
    const schema = Joi.object({
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required().min(6).max(10).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

    return schema.validate(user);
  },
  // updateUser: function (user) {
  //   const schema = Joi.object({
  //     name: Joi.string().alphanum().min(3).max(30).required(),
  //     lastName: Joi.string().alphanum().min(3).max(30).required(),
  //     email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  //     password: Joi.string().required().min(6).max(10).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  //     confirmPassword: Joi.ref('password'),
  //     image: Joi.required(),
  //   });
  //
  //   return schema.validate(user);
  // },
};
module.exports.Validators = Validators;
