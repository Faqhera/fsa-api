const bcrypt = require("bcrypt");

const getHash = (pass) => {
    return bcrypt.hash(pass, 2);
};

const compare = (pass,dbpass) => {
return bcrypt.compare(pass, dbpass);
};

module.exports = {
    getHash, compare,
}