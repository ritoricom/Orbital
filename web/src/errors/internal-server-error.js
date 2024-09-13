export class InternalServerError extends Error {
  constructor() {
    super("internal server error");
    this.name = "500 error";
    this.status = 500;
  }
}
