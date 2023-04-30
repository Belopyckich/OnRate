const ResponseDto = require("../dtos/response-dto");
const TokenSchema = require("../models/token-model");
const KanbanService = require("../service/kanban-service");
const ApiError = require("../exceptions/api-error");

class KanbanController {
  async kanbanColumnCreate(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      const kanbanColumn = await KanbanService.createColumn(
        req.body,
        tokenSchema.id
      );

      return res.json(
        new ResponseDto({
          data: kanbanColumn,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async kanbanTaskCreate(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      const kanbanTask = await KanbanService.createTask(
        req.body,
        tokenSchema.id
      );

      return res.json(
        new ResponseDto({
          data: kanbanTask,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async kanbanTaskEdit(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      const columnTasksWhereTaskIsDeleted = await KanbanService.editTask(
        req.body,
        tokenSchema.id
      );

      return res.json(
        new ResponseDto({
          data: columnTasksWhereTaskIsDeleted,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async kanbanTaskMove(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      const updatedTask = await KanbanService.moveTask(
        req.body,
        tokenSchema.id
      );

      return res.json(
        new ResponseDto({
          data: updatedTask,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async kanbanTaskDelete(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      const columnTasksWhereTaskIsDeleted = await KanbanService.deleteTask(
        req.body,
        tokenSchema.id
      );

      return res.json(
        new ResponseDto({
          data: columnTasksWhereTaskIsDeleted,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async kanbanColumnDelete(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      await KanbanService.deleteColumn(req.body.uid, tokenSchema.id);

      return res.json(
        new ResponseDto({
          data: {},
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async KanbanColumnEdit(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      const updatedColumn = await KanbanService.editColumn(
        req.body,
        tokenSchema.id
      );

      return res.json(
        new ResponseDto({
          data: updatedColumn,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async KanbanColumnMove(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      const updatedColumn = await KanbanService.moveColumn(
        req.body,
        tokenSchema.id
      );

      return res.json(
        new ResponseDto({
          data: updatedColumn,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async KanbanColumnDuplicate(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      const updatedColumn = await KanbanService.duplicateColumn(
        req.body.columnId,
        tokenSchema.id
      );

      return res.json(
        new ResponseDto({
          data: updatedColumn,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async KanbanColumnTasksMove(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      const destinationColumnTasks = await KanbanService.moveColumnTasks(
        req.body,
        tokenSchema.id
      );

      return res.json(
        new ResponseDto({
          data: destinationColumnTasks,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async getKanbanColumns(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      const kanbanColumns = await KanbanService.getColumns(tokenSchema.id);

      return res.json(
        new ResponseDto({
          data: kanbanColumns,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async getKanbanTasksByColumn(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      const kanbanTasks = await KanbanService.getTasksByColumns(
        tokenSchema.id,
        req.body.column
      );

      return res.json(
        new ResponseDto({
          data: kanbanTasks,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }
}

module.exports = new KanbanController();
