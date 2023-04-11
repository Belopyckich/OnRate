const { Schema, model, ObjectId } = require("mongoose");

const KanbanTask = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  position: { type: Number, required: true },
  column: { type: ObjectId, ref: "KanbanColumn" },
  user: { type: ObjectId, ref: "User" },
});

module.exports = model("KanbanTask", KanbanTask);
