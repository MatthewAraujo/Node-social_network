export class PostDoesNotExistsError extends Error {
  constructor() {
    super("Post does not exists");
  }
}