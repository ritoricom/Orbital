export class NotFoundError extends Error {
  constructor() {
    super("not found");
    this.name = "404 error";
    this.status = 404;
  }
}
