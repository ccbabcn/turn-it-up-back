const { Schema, model, SchemaTypes } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  roles: [{ type: String, default: [] }],
  createdprojects: [
    { type: SchemaTypes.ObjectId, ref: "Project", default: [] },
  ],
  joinedprojects: [{ type: SchemaTypes.ObjectId, ref: "Project", default: [] }],
});

const User = model("User", UserSchema, "users");
module.exports = User;
