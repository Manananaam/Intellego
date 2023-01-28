1. add JWT info to .env (everyone will need to do this directly because .env doesn't go to git), and then create config/keys to pull in that information
2. make changes to user model to add necessary auth logic:

- import bcrypt, jwt, and keys from env config
- add passwordChangeDate field to user model (optional), this means that if someone is logged in and then afterwards their password is changed, they'll be prompted to log in again with the new password.
- add hook that hashes passwords with 12 salt rounds (only if the password is new)
- add hook that updates "passwordChangeDate" field when a user changes their password
- add 'excludePasswordField' method to exclude password information when returning user information
- add generateToken method that returns a jwt
- add checkPassword method that compares entered password to password in db
- add checkToken method that finds user by token, and throws an error if the user doesn't exist or the token is invalid
- add tokenPrecedesPWChange method, which compares the date the token was generated to the date of the most recent password change, and returns "true" if the token is older than the pw change.
