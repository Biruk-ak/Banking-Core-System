import type { ForeignExchangeCommandHandler } from '../application/command-handler';
import type { ForeignExchangeQueryHandler } from '../application/query-handler';
import type { ForeignExchangeCommand } from '../application/commands';
import type { ForeignExchangeQuery } from '../application/queries';
export interface HttpRequest {
  method: string;
  path: string;
  body?: unknown;
  query?: Record<string, string>;
  headers?: Record<string, string>;
}
export interface HttpResponse {
  status: number;
  body: unknown;
}
export class ForeignExchangeHttpApi {
  constructor(
    private readonly commands: ForeignExchangeCommandHandler,
    private readonly queries: ForeignExchangeQueryHandler,
  ) {}
  async handle(req: HttpRequest): Promise<HttpResponse> {
    const auth = req.headers?.authorization;
    if (!auth) return { status: 401, body: { error: 'Unauthorized' } };
    if (req.method === 'POST' && req.path === '/foreign-exchange/commands') {
      const result = await this.commands.handle(req.body as ForeignExchangeCommand);
      return { status: result.success ? 200 : 400, body: result };
    }
    if (req.method === 'POST' && req.path === '/foreign-exchange/queries') {
      const result = await this.queries.handle(req.body as ForeignExchangeQuery);
      return { status: 200, body: result };
    }
    if (req.method === 'GET' && req.path.startsWith('/foreign-exchange/')) {
      const id = req.path.split('/').pop()!;
      const result = await this.queries.handle({ type: 'GetForeignExchangeById', productId: id });
      return { status: result ? 200 : 404, body: result ?? { error: 'Not found' } };
    }
    return { status: 404, body: { error: 'Route not found' } };
  }
}
