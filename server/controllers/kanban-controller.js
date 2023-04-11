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
}

module.exports = new KanbanController();
