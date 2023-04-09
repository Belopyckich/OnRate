const fileService = require("../service/file-service");
const File = require("../models/file-model");
const ApiError = require("../exceptions/api-error");
const ResponseDto = require("../dtos/response-dto");
const fs = require("fs");

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body;
      const file = new File({ name, type, parent, user: req.user.id });
      const parentFile = await File.findOne({ id: parent });

      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await parentFile.save();
      }

      await file.save();
    } catch (e) {
      console.log(e);
      return ApiError.BadRequest("Ошибка при создании файла");
    }
  }

  async getFiles(req, res) {
    try {
      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent,
      });

      return res.json(
        new ResponseDto({
          data: { files },
          success: true,
        })
      );
    } catch (e) {
      console.log(e);
      return ApiError.BadRequest("Ошибка при получении файлов");
    }
  }

  async uploadFile(req, res) {
    try {
      const file = req.files.file;

      const parent = await File.findOne({
        user: req.user.id,
        _id: req.body.parent,
      });
      const user = await User.findOne({ _id: req.user.id });

      let path;

      if (parent) {
        path = `${process.env.FILE_PATH}\\${user._id}\\${parent.path}\\${file.name}`;
      } else {
        path = `${process.env.FILE_PATH}\\${user._id}\\${file.name}`;
      }

      if (fs.existsSync(path)) {
        return ApiError.BadRequest("Такой файл уже существует");
      }

      file.mv(path);

      const type = file.name.split(".").pop();

      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: parent?.path,
        parent: parent?._id,
        user: user._id,
      });

      await dbFile.save();
      await user.save();

      return res.json(
        new ResponseDto({
          data: dbFile,
          success: true,
        })
      );
    } catch (e) {
      console.log(e);
      return ApiError.BadRequest("Ошибка при загрузке файла");
    }
  }
}

module.exports = new FileController();
