export class UserDoesNotHavePostsError extends Error {
  constructor() {
    super("User does not have posts");
  }
}