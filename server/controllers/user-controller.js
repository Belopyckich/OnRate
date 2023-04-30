const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const ResponseDto = require("../dtos/response-dto");
const TokenSchema = require("../models/token-model");
const fileService = require("../service/file-service");
const File = require("../models/file-model");

class UserController {
  async registration(req, res, next) {
    try {
      const validationResults = validationResult(req);

      if (!validationResults.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", validationResults.array())
        );
      }

      const { name, email, password } = req.body;

      const userData = await userService.registration(name, email, password);

      await fileService.createDir(
        new File({ user: userData.user.id, name: "" })
      );

      res.cookie("accessToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(
        new ResponseDto({
          data: userData,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie("accessToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(
        new ResponseDto({
          data: userData,
          success: true,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const token = await userService.logout(refreshToken);

      res.clearCookie("accessToken");

      return res.json(
        new ResponseDto({
          data: token,
          success: true,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;

      await userService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { accessToken } = req.cookies;

      const userData = await userService.refresh(accessToken);

      res.cookie("accessToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(
        new ResponseDto({
          data: userData,
          success: true,
        })
      );
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const user = req.body;

      const file = req.files?.file;
      console.log("🚀 ~ file:", file);

      const picture = file
        ? await userService.uploadPhoto(file, user.id)
        : await fileService.deletePhoto(user.id);

      const userData = await userService.update(user);

      return res.json(
        new ResponseDto({
          data: { ...userData, picture: picture },
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async setUserStartPage(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      if (!req.body.startPage) {
        return ApiError.BadRequest(
          "Произошла ошибка при смене стартовой страницы"
        );
      }

      const userData = await userService.setUserStartPage({
        id: tokenSchema.user,
        startPage: req.body.startPage,
      });

      return res.json(
        new ResponseDto({
          data: userData.startPage,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async setUserBackground(req, res, next) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];

      const background = req.body.background || "";

      const tokenSchema = await TokenSchema.findOne({
        refreshToken: accessToken,
      });

      if (!tokenSchema) {
        return ApiError.UnauthorizedError();
      }

      await userService.setUserBackground({
        id: tokenSchema.user,
        background,
      });

      return res.json(
        new ResponseDto({
          data: background,
          success: true,
        })
      );
    } catch (error) {
      console.log(error, "error");
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();

      return res.json(
        new ResponseDto({
          data: users,
          success: true,
        })
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
