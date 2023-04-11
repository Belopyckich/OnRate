const { Schema, model, ObjectId } = require("mongoose");

const KanbanColumn = new Schema({
  title: { type: String, required: true },
  color: {
    type: {
      r: { type: Number, unique: false, required: false },
      g: { type: Number, unique: false, required: false },
      b: { type: Number, unique: false, required: false },
    },
  },
  position: { type: Number, required: true },
  dealsCount: { type: Number, required: true },
  user: { type: ObjectId, ref: "User" },
});

module.exports = model("KanbanColumn", KanbanColumn);
