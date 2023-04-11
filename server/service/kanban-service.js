const KanbanColumnModel = require("../models/kanban-column-model");
const ApiError = require("../exceptions/api-error");

class KanbanService {
  async createColumn(column, _id) {
    try {
      const { title, color } = column;

      const kanbanColumns = await KanbanColumnModel.find({ user: _id });

      const dbColumn = new KanbanColumnModel({
        title,
        color,
        position: kanbanColumns?.length || 0,
        dealsCount: 0,
        user: _id,
      });

      await dbColumn.save();

      return dbColumn;
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest("Произошла ошибка при создании колонки");
    }
  }

  async deleteColumn(columnUid, _id) {
    try {
      const deletedColumn = await KanbanColumnModel.findOne({
        user: _id,
        _id: columnUid,
      });

      if (!deletedColumn) {
        throw ApiError.BadRequest("Колонка не найдена");
      }

      await deletedColumn.deleteOne();
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest("Произошла ошибка при создании колонки");
    }
  }

  async getColumns(_id) {
    try {
      const kanbanColumns = await KanbanColumnModel.find({ user: _id });

      return kanbanColumns;
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest("Произошла ошибка при получении колонок");
    }
  }
}

module.exports = new KanbanService();
