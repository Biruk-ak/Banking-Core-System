import type { LoansCommandHandler } from '../application/command-handler';
import type { LoansQueryHandler } from '../application/query-handler';
import type { LoansCommand } from '../application/commands';
import type { LoansQuery } from '../application/queries';
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
export class LoansHttpApi {
  constructor(
    private readonly commands: LoansCommandHandler,
    private readonly queries: LoansQueryHandler,
  ) {}
  async handle(req: HttpRequest): Promise<HttpResponse> {
    const auth = req.headers?.authorization;
    if (!auth) return { status: 401, body: { error: 'Unauthorized' } };
    if (req.method === 'POST' && req.path === '/loans/commands') {
      const result = await this.commands.handle(req.body as LoansCommand);
      return { status: result.success ? 200 : 400, body: result };
    }
    if (req.method === 'POST' && req.path === '/loans/queries') {
      const result = await this.queries.handle(req.body as LoansQuery);
      return { status: 200, body: result };
    }
    if (req.method === 'GET' && req.path.startsWith('/loans/')) {
      const id = req.path.split('/').pop()!;
      const result = await this.queries.handle({ type: 'GetLoansById', productId: id });
      return { status: result ? 200 : 404, body: result ?? { error: 'Not found' } };
    }
    return { status: 404, body: { error: 'Route not found' } };
  }
}
