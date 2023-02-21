const pool = require("../config/db");

const createUsers = (data) => {
  const { id, email, firstname, lastname, password, alamat, phonenumber, otp } =
    data;

  console.log(data);
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO users(id,email,firstname,lastname,password,alamat,phone,otp) VALUES ('${id}','${email}','${firstname}','${lastname}','${password}','${alamat}','${phonenumber}','${otp}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const checkEmail = (email) => {
  console.log(email);
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * FROM users where email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getAll = ({ search, sortBy }) => {
  return new Promise((resolve, reject) =>
    pool.query(
      `SELECT users.id, users.firstname,users.lastname,users.email,users.phone,users.alamat FROM users as users
       ORDER BY users.${sortBy} `,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};
module.exports = {
  createUsers,
  checkEmail,
  getAll,
};
