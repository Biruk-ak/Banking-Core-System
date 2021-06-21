import type { CurrentAccountsCommandHandler } from '../application/command-handler';
import type { CurrentAccountsQueryHandler } from '../application/query-handler';
import type { CurrentAccountsCommand } from '../application/commands';
import type { CurrentAccountsQuery } from '../application/queries';
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
export class CurrentAccountsHttpApi {
  constructor(
    private readonly commands: CurrentAccountsCommandHandler,
    private readonly queries: CurrentAccountsQueryHandler,
  ) {}
  async handle(req: HttpRequest): Promise<HttpResponse> {
    const auth = req.headers?.authorization;
    if (!auth) return { status: 401, body: { error: 'Unauthorized' } };
    if (req.method === 'POST' && req.path === '/current-accounts/commands') {
      const result = await this.commands.handle(req.body as CurrentAccountsCommand);
      return { status: result.success ? 200 : 400, body: result };
    }
    if (req.method === 'POST' && req.path === '/current-accounts/queries') {
      const result = await this.queries.handle(req.body as CurrentAccountsQuery);
      return { status: 200, body: result };
    }
    if (req.method === 'GET' && req.path.startsWith('/current-accounts/')) {
      const id = req.path.split('/').pop()!;
      const result = await this.queries.handle({ type: 'GetCurrentAccountsById', productId: id });
      return { status: result ? 200 : 404, body: result ?? { error: 'Not found' } };
    }
    return { status: 404, body: { error: 'Route not found' } };
  }
}
