// utils/validation.js
const Joi = require('joi');

function validarEstudiante(estudiante) {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    codestudiante: Joi.number().required(),
  });

  return schema.validate(estudiante);
}

module.exports = {
  validarEstudiante,
};
