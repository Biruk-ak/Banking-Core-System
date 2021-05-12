import type { SavingsCommandHandler } from '../application/command-handler';
import type { SavingsQueryHandler } from '../application/query-handler';
import type { SavingsCommand } from '../application/commands';
import type { SavingsQuery } from '../application/queries';
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
export class SavingsHttpApi {
  constructor(
    private readonly commands: SavingsCommandHandler,
    private readonly queries: SavingsQueryHandler,
  ) {}
  async handle(req: HttpRequest): Promise<HttpResponse> {
    const auth = req.headers?.authorization;
    if (!auth) return { status: 401, body: { error: 'Unauthorized' } };
    if (req.method === 'POST' && req.path === '/savings/commands') {
      const result = await this.commands.handle(req.body as SavingsCommand);
      return { status: result.success ? 200 : 400, body: result };
    }
    if (req.method === 'POST' && req.path === '/savings/queries') {
      const result = await this.queries.handle(req.body as SavingsQuery);
      return { status: 200, body: result };
    }
    if (req.method === 'GET' && req.path.startsWith('/savings/')) {
      const id = req.path.split('/').pop()!;
      const result = await this.queries.handle({ type: 'GetSavingsById', productId: id });
      return { status: result ? 200 : 404, body: result ?? { error: 'Not found' } };
    }
    return { status: 404, body: { error: 'Route not found' } };
  }
}
