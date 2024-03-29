const UserModel = require("../models/user-model");
const FileModel = require("../models/file-model");
const UserDto = require("../dtos/user-dto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const tokenService = require("./token-service");
const fileService = require("./file-service");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(name, email, password) {
    const hasCandidateWithSameEmail = await UserModel.findOne({ email });
    const hasCandidateWithSameName = await UserModel.findOne({ name });

    if (hasCandidateWithSameEmail) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    if (hasCandidateWithSameName) {
      throw ApiError.BadRequest(
        `Пользователь с таким именем ${name} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
      activationLink,
      //Когда настрою почту надо будет убрать
      isActivated: true,
      background: "",
      startPage: "/kanban",
    });

    // Пока закомичена в связи с блокировкой емэила
    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate/${activationLink}`
    // );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }

    user.isActivated = true;

    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async update(updatedUser) {
    const { id, name, dob, location } = updatedUser;

    const user = await UserModel.findById(id);

    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    user.name = name;
    user.dob = dob;
    user.location = JSON.parse(location);

    await user.save();

    const userDto = new UserDto(user);

    return userDto;
  }

  async setUserStartPage(data) {
    const { id, startPage } = data;

    const user = await UserModel.findById(id);

    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    user.startPage = startPage;

    await user.save();

    const userDto = new UserDto(user);

    return userDto;
  }

  async setUserBackground(data) {
    const { id, background } = data;

    const user = await UserModel.findById(id);

    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    user.background = background;

    await user.save();

    const userDto = new UserDto(user);

    return userDto;
  }

  async uploadPhoto(file, _id) {
    const user = await UserModel.findOne({ _id });
    const oldFile = await FileModel.findOne({ user: _id });

    if (!user) {
      throw ApiError.BadRequest("Пользователь не найден");
    }

    const src = await fileService.uploadPhoto({
      file,
      _id,
    });

    if (oldFile) {
      await fileService.deletePhoto(_id);
    }

    const picture = {
      thumbnail: src,
      medium: src,
      large: src,
    };

    user.picture = picture;

    await user.save();

    return picture;
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();
