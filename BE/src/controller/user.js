const { response } = require("../middlewares/response");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken, generateRefreshToken } = require("../helpers/jwt");
const ModelUsers = require("../model/user");
const email = require("../middlewares/email");

const Port = process.env.PORT;
const Host = process.env.HOST;

const userController = {
  register: async (req, res) => {
    let {
      rows: [users],
    } = await ModelUsers.checkEmail(req.body.email);
    if (users) {
      return response(res, 403, false, [], "EMAIL ALREADY BEEN REGISTERED");
    }

    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    ////CREATE DATA
    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id: uuidv4(),
      email: req.body.email,
      password,
      otp,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
      alamat: req.body.alamat,
    };

    try {
      const result = await ModelUsers.createUsers(data);
      if (result) {
        let verifUrl = `http://${Host}:${Port}/users/${req.body.email}/${otp}`;
        let text = `Hello ${req.body.fullname} \n Thank you for join us. Please confirm your email by clicking on the following link ${verifUrl}`;
        const subject = `${otp} is your otp`;
        let sendEmail = email(req.body.email, subject, text);
        if (sendEmail == "email not sent!") {
          return response(res, 404, false, null, "register fail");
        }
        response(
          res,
          200,
          true,
          { email: data.email },
          "register success please check your email"
        );
      }
    } catch (err) {
      response(res, 404, false, err, " register fail");
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.email;
      console.log(email, "email");
      let {
        rows: [users],
      } = await ModelUsers.checkEmail(email);
      if (!users) {
        return response(res, 404, false, null, "email not found");
      }

      const password = req.body.password;
      const validation = bcrypt.compareSync(password, users.password);
      if (!validation) {
        return response(res, 404, false, null, "wrong password");
      }

      delete users.password;
      let payload = {
        id: users.id,
        fullname: users.fullname,
        email: users.email,
      };
      let accessToken = generateToken(payload);
      let refToken = generateRefreshToken(payload);

      users.token = accessToken;
      users.refreshToken = refToken;

      response(res, 200, true, users, "LOGIN SUCCESS");
    } catch (err) {
      return response(res, 404, false, err, "LOGIN FAILED");
    }
  },
  getAllData: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || "id";
      const sortOrder = req.query.sortOrder || "DESC";
      const search = req.query.search || "";

      const result = await ModelUsers.getAll({
        search,
        sortBy,
        sortOrder,
      });
      response(res, 200, true, result.rows, "get product success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, null, "get products failed");
    }
  },
};

exports.userController = userController;
