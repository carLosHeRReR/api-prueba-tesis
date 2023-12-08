// utils/validation.js
const Joi = require('joi');

function validarEstudiante(estudiante) {
  const schema = Joi.object({
    correoInstitucional: Joi.string(),
    codestudiante: Joi.number(),
  });

  return schema.validate(estudiante);
}

module.exports = {
  validarEstudiante,
};
