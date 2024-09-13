export class InternalServerError extends Error {
  constructor(msg?: string) {
    super(msg);
    this.name = "InternalServerError";
  }
}
