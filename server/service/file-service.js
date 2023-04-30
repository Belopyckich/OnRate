const fs = require("fs");
const File = require("../models/file-model");
const ApiError = require("../exceptions/api-error");
const FileModel = require("../models/file-model");
const UserModel = require("../models/user-model");

class FileService {
  createDir(file) {
    const filePath = `${process.env.FILE_PATH}\\${file.user}\\${file.path}`;

    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);

          return resolve({ message: "File was created" });
        } else {
          return reject({ message: "File already exist" });
        }
      } catch (e) {
        return reject({ message: "File error" });
      }
    });
  }

  async uploadPhoto({ file, _id, parent }) {
    try {
      let path;

      if (parent) {
        path = `${process.env.FILE_PATH}\\${_id}\\${parent.path}\\${file.name}`;
      } else {
        path = `${process.env.FILE_PATH}\\${_id}\\${file.name}`;
      }

      if (fs.existsSync(path) && file) {
        throw ApiError.BadRequest("Такой файл уже существует");
      }

      file.mv(path);

      const type = file.name.split(".").pop();

      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: parent?.path,
        parent: parent?._id,
        user: _id,
      });

      await dbFile.save();

      return `${process.env.API_URL}\\${process.env.FILE_DIR}\\${_id}\\${file.name}`;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  async deletePhoto(_id) {
    const userPhoto = await FileModel.findOne({ user: _id });

    if (!userPhoto) {
      return undefined;
    }

    const path = `${process.env.FILE_PATH}\\${_id}\\${userPhoto.name}`;

    if (!fs.existsSync(path)) {
      return ApiError.BadRequest("Такого файла не существует");
    }

    fs.unlinkSync(path);

    await userPhoto.deleteOne();

    const user = await UserModel.findById(_id);

    user.picture = {
      large: undefined,
      medium: undefined,
      thumbnail: undefined,
    };

    await user.save();

    return undefined;
  }
}

module.exports = new FileService();
