const {
  checkIfUserExists,
  hashPassword,
  createUserAndValidate,
  createAuthToken,
  getUser,
  verifyPassword,
} = require("./utils");

async function handleRegister(req, res, next) {
  let userDetails = req.body;
  const { username, email, password } = userDetails;
  try {
    if (!username || !email || !password) {
      // bad request
      res.status(400);
      throw new Error("username, email and password fields are required.");
    }
    // check if user already exists
    await checkIfUserExists(username, email);
    // hash the password
    const hash = await hashPassword(password);
    userDetails.passwordHash = hash;
    // validate and add user to db
    const user = await createUserAndValidate(userDetails);
    // create jwt and send it back in response
    user.token = await createAuthToken(user);
    // response
    res.json({ user });
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
}

async function handleLogin(req, res, next) {
  let userDetails = req.body;
  const { username, password } = userDetails;
  try {
    if (!username || !password) {
      // bad request
      res.status(400);
      throw new Error("username and password fields are required.");
    }

    // get user and check if user exists
    let user = await getUser({ username });
    console.log(user);
    if (user === null) {
      res.status(404);
      throw new Error("user not found");
    }
    // verify password
    await verifyPassword(password, user.passwordHash);
    const userDetails = { username: user.username, email: user.email };
    // create token and send back
    userDetails.token = createAuthToken(userDetails);
    // response
    res.json({
      user: userDetails,
    });
  } catch (error) {
    if (error.statusCode) res.status(error.statusCode);
    next(error);
  }
}

module.exports = { handleRegister, handleLogin };
