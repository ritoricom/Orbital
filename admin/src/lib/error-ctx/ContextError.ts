export class ContextError extends Error {
  public ctx: string;
  public source: Error;

  constructor(ctx: string, source: Error) {
    super(source.message);
    this.name = source.name;
    this.ctx = ctx;
    this.source = source;
  }
}
