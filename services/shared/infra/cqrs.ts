/** CQRS mediator for Banking Core System */
export type Command = { type: string } & Record<string, unknown>;
export type Query = { type: string } & Record<string, unknown>;

export type CommandHandlerFn<C extends Command = Command, R = unknown> = (cmd: C) => Promise<R>;
export type QueryHandlerFn<Q extends Query = Query, R = unknown> = (query: Q) => Promise<R>;

export class CqrsMediator {
  private commandHandlers = new Map<string, CommandHandlerFn>();
  private queryHandlers = new Map<string, QueryHandlerFn>();
  private commandLog: { type: string; at: string; ok: boolean }[] = [];

  registerCommand<C extends Command, R>(type: string, handler: CommandHandlerFn<C, R>): void {
    this.commandHandlers.set(type, handler as CommandHandlerFn);
  }

  registerQuery<Q extends Query, R>(type: string, handler: QueryHandlerFn<Q, R>): void {
    this.queryHandlers.set(type, handler as QueryHandlerFn);
  }

  async send<R = unknown>(cmd: Command): Promise<R> {
    const h = this.commandHandlers.get(cmd.type);
    if (!h) throw new Error('No command handler for ' + cmd.type);
    try {
      const result = await h(cmd);
      this.commandLog.push({ type: cmd.type, at: new Date().toISOString(), ok: true });
      return result as R;
    } catch (e) {
      this.commandLog.push({ type: cmd.type, at: new Date().toISOString(), ok: false });
      throw e;
    }
  }

  async ask<R = unknown>(query: Query): Promise<R> {
    const h = this.queryHandlers.get(query.type);
    if (!h) throw new Error('No query handler for ' + query.type);
    return h(query) as Promise<R>;
  }

  getCommandLog() { return [...this.commandLog]; }
}
