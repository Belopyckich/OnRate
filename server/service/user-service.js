const UserModel = require("../models/user-model");
const UserDto = require("../dtos/user-dto");
const ResponseDto = require("../dtos/response-dto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(name, email, password) {
    const hasCandidateWithSameEmail = await UserModel.findOne({ email });
    const hasCandidateWithSameName = await UserModel.findOne({ name });

    if (hasCandidateWithSameEmail) {
      throw new ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    if (hasCandidateWithSameName) {
      throw new ApiError.BadRequest(
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
    });
    console.log("🚀 ~ user:", user);

    // Пока закомичена в связи с блокировкой емэила
    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate/${activationLink}`
    // );

    const userDto = new UserDto(user);
    console.log("🚀 ~ userDto:", userDto);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return new ResponseDto({
      data: { ...tokens, user: userDto },
      success: true,
    });
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw new ApiError.BadRequest("Неккоректная ссылка активации");
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
    console.log("🚀 ~ userDto:", userDto);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return new ResponseDto({
      data: { ...tokens, user: userDto },
      success: true,
    });
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken({ refreshToken });
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return new ResponseDto({
      data: { ...tokens, user: userDto },
      success: true,
    });
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();
