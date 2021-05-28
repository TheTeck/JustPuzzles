const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  login
};

async function login(req, res) {
    console.log(req.body)
    try {
        if (req.body.username === 'admin' && req.body.password === 'letmein') {
            const token = createJWT(req.body);
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