# AUTH & AUTH(Authentication and Authorization)

## server

- Auth
  - server.js - express server setup
  - index.js - express server listen
  - errorHandlers.js - not found handler and error handler
  - db
    - connection.js - mongodb connection
      - uses mongoose
    - schema
      - user
        - {username, email, passwordHash}
      - passwordReset
        - {userId, token, expiry}
  - routes
    - /register (register new user)
    - /login (user login)
    - /check-unique (check unique username or email)
    - /authorize (user authorization - verify jwt)
    - /password-reset (reset password)
      - /create (create password reset entry and send email)
      - /verify (verify and check expiry of password reset token)
      - /update (update password if password reset token is valid)
    - authHandlers.js and passwordResetHandlers.js (all the route handlers are defined in these files)
  - utils (auth utilities)
    - checkIfUserExists
    - hashPassword
    - createUserAndValidate
    - createAuthToken
    - getUser
    - verifyPassword
    - validateField
    - verifyToken
    - getPasswordResetEntry
    - sendPasswordResetEmail
    - checkPasswordResetExpiry
    - updatePasswordHash
    - removePasswordResetEntry
  - npm packages used
    - mongoose (to connect and interact with mongodb database)
    - volleyball (http request response logger)
    - cors (to handle cors)
    - bcrypt (to hash and verify password)
    - jsonwebtoken (to create and verify auth tokens)
    - nanoid (to create unique tokens for password reset)
    - nodemailer (to send password reset mails - uses sendinblue smtp server)
    - dotenv (to load .env variables)

## client

- pages
  - Register.js - register new user
  - Login.js - user login
  - PasswordResetCreate.js - create password reset entry
  - PasswordResetUpdate.js - update password
  - User.js - user page after user logged in. contains logout.
- routes
  - /register - Register.js
  - /login - Login.js
  - /password-reset/create - PasswordResetCreate.js
  - /password-reset/update - PasswordResetUpdate.js
  - /user - User.js
- context
  - Auth context
    - contains login, register, logout, createPasswordReset, verifyPasswordReset, updatePassword
    - state
      - user (contains user details)
    - effects
      - authorize
        - makes use of local storage to store user jwt.
- hooks
  - useDebounceValue
    - validates and check username and email for uniqueness in the register page as the user types
    - the value is also debounced (previous call is cancelled if user continues to type)
