const KanbanColumnModel = require("../models/kanban-column-model");
const KanbanTaskModel = require("../models/kanban-task-model");
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

  async createTask(task, _id) {
    try {
      const { title, description, column } = task;

      const kanbanColumn = await KanbanColumnModel.findOne({ _id: column });

      if (!kanbanColumn) {
        throw ApiError.BadRequest("Колонка не найдена");
      }

      const dbTask = new KanbanTaskModel({
        title,
        description,
        column: column,
        position: kanbanColumn.dealsCount,
        user: _id,
      });

      kanbanColumn.dealsCount = kanbanColumn.dealsCount + 1;

      await dbTask.save();
      await kanbanColumn.save();

      return dbTask;
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest("Произошла ошибка при создании задачи");
    }
  }

  async editTask(task, userId) {
    try {
      const { _id, ...otherUpdatedTaskData } = task;

      const currentTaskInDb = await KanbanTaskModel.findOne({
        _id,
        user: userId,
      });

      if (!currentTaskInDb) {
        throw ApiError.BadRequest("Задача не найдена");
      }

      const oldColumn = currentTaskInDb.column;
      const newColumn = otherUpdatedTaskData.column;

      const isTaskColumnChanged = oldColumn !== newColumn;

      if (isTaskColumnChanged) {
        currentTaskInDb.column = newColumn;
        currentTaskInDb.position = otherUpdatedTaskData.position;
      }

      currentTaskInDb.title = otherUpdatedTaskData.title;
      currentTaskInDb.description = otherUpdatedTaskData.description;

      currentTaskInDb.save();

      if (isTaskColumnChanged) {
        const columnWhereTaskIsMovedOut = await KanbanColumnModel.findOne({
          _id: oldColumn,
          user: userId,
        });

        columnWhereTaskIsMovedOut.dealsCount =
          columnWhereTaskIsMovedOut.dealsCount - 1;

        columnWhereTaskIsMovedOut.save();

        await KanbanTaskModel.find({
          column: oldColumn,
          user: userId,
        }).then((columns) =>
          columns.map((column, index) => {
            column.position = index;
            column.save();

            return column;
          })
        );

        const columnWhereTaskIsMovedIn = await KanbanColumnModel.findOne({
          _id: newColumn,
          user: userId,
        });
        console.log("🚀 ~ columnWhereTaskIsMovedIn:", columnWhereTaskIsMovedIn);

        columnWhereTaskIsMovedIn.dealsCount =
          columnWhereTaskIsMovedIn.dealsCount + 1;

        columnWhereTaskIsMovedIn.save();
      }

      return currentTaskInDb;
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest("Произошла ошибка при изменении задачи");
    }
  }

  async moveTask(result, userId) {
    try {
      if (!result.destination || !result.source || !result.draggableId) {
        throw ApiError.BadRequest("Произошла ошибка при перетаскивании задачи");
      }

      const { index: destinationIndex, droppableId: destinationColumn } =
        result.destination;
      const { index: sourceIndex, droppableId: sourceColumn } = result.source;

      const isTaskColumnChanged = destinationColumn !== sourceColumn;

      if (isTaskColumnChanged) {
        const destinationColumnFromDb = await KanbanColumnModel.findOne({
          _id: destinationColumn,
          user: userId,
        });

        const sourceColumnFromDb = await KanbanColumnModel.findOne({
          _id: sourceColumn,
          user: userId,
        });

        destinationColumnFromDb.dealsCount =
          destinationColumnFromDb.dealsCount + 1;
        sourceColumnFromDb.dealsCount = sourceColumnFromDb.dealsCount - 1;

        destinationColumnFromDb.save();
        sourceColumnFromDb.save();

        const movedTask = await KanbanTaskModel.findOne({
          column: sourceColumn,
          user: userId,
          _id: result.draggableId,
        });

        movedTask.column = destinationColumn;

        movedTask.save();

        await KanbanTaskModel.find({
          column: sourceColumn,
          user: userId,
        }).then((tasks) => {
          tasks.map((task, index) => {
            task.position = index;
            task.save();

            return task;
          });
        });

        await KanbanTaskModel.find({
          column: destinationColumn,
          user: userId,
        }).then((tasks) => {
          const sortedTasksWithoutMoved = tasks
            .filter((task) => task._id !== movedTask._id)
            .sort((a, b) => a.position - b.position);

          const currentMovedTask = tasks.find(
            (task) => task._id === movedTask._id
          );

          sortedTasksWithoutMoved.splice(destinationIndex, 0, currentMovedTask);

          return tasks.map((task, index) => {
            task.position = index;
            task.save();

            return task;
          });
        });

        return true;
      } else {
        await KanbanTaskModel.find({
          column: sourceColumn,
          user: userId,
        }).then((tasks) => {
          const sortedTasks = tasks.sort((a, b) => a.position - b.position);

          const [removed] = sortedTasks.splice(sourceIndex, 1);

          sortedTasks.splice(destinationIndex, 0, removed);

          return tasks.map((task, index) => {
            task.position = index;
            task.save();

            return task;
          });
        });

        return true;
      }
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest("Произошла ошибка при перетаскивании задачи");
    }
  }

  async deleteTask(task, userId) {
    try {
      const { _id, column } = task;

      const columnWhereTaskIdDelete = await KanbanColumnModel.findOne({
        _id: column,
        user: userId,
      });

      columnWhereTaskIdDelete.dealsCount =
        columnWhereTaskIdDelete.dealsCount - 1;

      columnWhereTaskIdDelete.save();

      await KanbanTaskModel.findOneAndRemove({
        _id,
        user: userId,
        column,
      });

      const updatedColumns = await KanbanTaskModel.find({
        column,
        user: userId,
      }).then((columns) =>
        columns.map((column, index) => {
          column.position = index;
          column.save();

          return column;
        })
      );

      return updatedColumns;
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest("Произошла ошибка при удалении задачи");
    }
  }

  async editColumn(column, userId) {
    try {
      const { title, color, _id } = column;

      const kanbanColumn = await KanbanColumnModel.findOne({
        user: userId,
        _id,
      });

      if (!kanbanColumn) {
        throw ApiError.BadRequest("Колонка не найдена");
      }

      kanbanColumn.title = title;
      kanbanColumn.color = color;

      await kanbanColumn.save();

      return kanbanColumn;
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest("Произошла ошибка при создании колонки");
    }
  }

  async moveColumn(columns, userId) {
    try {
      if (!columns?.length) {
        throw ApiError.BadRequest("Колонки не найдены");
      }

      await columns.map(({ _id, position }) => {
        KanbanColumnModel.findOneAndUpdate(
          {
            _id,
            user: userId,
          },
          {
            position,
          }
        );
      });
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

  async getTasksByColumns(_id, columnUid) {
    try {
      const kanbanColumn = await KanbanColumnModel.findOne({
        user: _id,
        _id: columnUid,
      });

      if (!kanbanColumn) {
        throw ApiError.BadRequest("Колонка не найдена");
      }

      const kanbanTasks = await KanbanTaskModel.find({
        user: _id,
        column: columnUid,
      });

      return kanbanTasks || [];
    } catch (e) {
      console.log(e);
      throw ApiError.BadRequest("Произошла ошибка при получении колонок");
    }
  }
}

module.exports = new KanbanService();
