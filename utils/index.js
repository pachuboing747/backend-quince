const bcrypt = require("bcrypt");
const { fileURLToPath } = require("url");
const { dirname } = require("path");

exports.createHash = async (password) => {
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salts);
};

exports.passwordValidation = async (user, password) => bcrypt.compare(password, user.password);

const currentFilename = __filename;
const currentDirname = __dirname;

exports.currentDirname = currentDirname;
