import Joi from "joi";

export const usersValidation = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};

export const studentValidation = (student) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    courses: Joi.array().items(Joi.string()),
  });
  return schema.validate(student);
};

export const courseValidation = (course) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    students: Joi.array().items(Joi.string()),
  });
  return schema.validate(course);
};
