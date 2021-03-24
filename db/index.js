const StateDB = require("./Schemas/State.js"),
TokenDB = require("./Schemas/Token.js"),
srs = require("secure-random-string");


module.exports.CreateState = async(callback) => {
    let stateID = srs({length:40});
    let stateDB = new StateDB({
        state: stateID,
        callback: callback
    });
    stateDB.save();
    return stateDB;
}
module.exports.CreateToken = async(access_token) => {
    let tokenID = srs({length:20});
    let tokenDB = new TokenDB({
        token: tokenID,
        access_token: access_token
    });
    tokenDB.save();
    return tokenDB;
}
module.exports.FindToken = async(token) => {
    let tokenDB = await TokenDB.findOne({token: token});
    if(tokenDB) return tokenDB;
};
module.exports.GetState = async(state) => {
    let stateDB = await StateDB.findOne({state: state});
    if(stateDB) return stateDB;
}