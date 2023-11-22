export class UserCredentialsIncorrectError extends Error {
  constructor() {
    super("User credentials incorrect");
  }
}