import type { MortgagesCommandHandler } from '../application/command-handler';
import type { MortgagesQueryHandler } from '../application/query-handler';
import type { MortgagesCommand } from '../application/commands';
import type { MortgagesQuery } from '../application/queries';
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
export class MortgagesHttpApi {
  constructor(
    private readonly commands: MortgagesCommandHandler,
    private readonly queries: MortgagesQueryHandler,
  ) {}
  async handle(req: HttpRequest): Promise<HttpResponse> {
    const auth = req.headers?.authorization;
    if (!auth) return { status: 401, body: { error: 'Unauthorized' } };
    if (req.method === 'POST' && req.path === '/mortgages/commands') {
      const result = await this.commands.handle(req.body as MortgagesCommand);
      return { status: result.success ? 200 : 400, body: result };
    }
    if (req.method === 'POST' && req.path === '/mortgages/queries') {
      const result = await this.queries.handle(req.body as MortgagesQuery);
      return { status: 200, body: result };
    }
    if (req.method === 'GET' && req.path.startsWith('/mortgages/')) {
      const id = req.path.split('/').pop()!;
      const result = await this.queries.handle({ type: 'GetMortgagesById', productId: id });
      return { status: result ? 200 : 404, body: result ?? { error: 'Not found' } };
    }
    return { status: 404, body: { error: 'Route not found' } };
  }
}
