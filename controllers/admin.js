const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const ADMIN_NAME = process.env.ADMIN_NAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

module.exports = {
  login
};

async function login(req, res) {
    try {
        if (req.body.username === ADMIN_NAME && req.body.password === ADMIN_PASSWORD) {
            const token = createJWT(req.body.username);
            res.json({token});
        } else {
            return res.status(401).json({err: 'bad credentials'});
        }
    } catch (err) {
        return res.status(401).json(err)
    }
}


/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}