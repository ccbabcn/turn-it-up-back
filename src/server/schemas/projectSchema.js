const { Joi } = require("express-validation");

const projectCreateCredentials = {
  body: Joi.object({
    name: Joi.string().messages({ message: "A name is required" }).required(),
    description: Joi.string()
      .messages({ message: "A description is required" })
      .required(),
    genres: Joi.array().default([]),
    roles: Joi.array().default([]),
    image: Joi.string().allow(null, ""),
    id: Joi.string().optional(),
  }),
};

module.exports = projectCreateCredentials;
