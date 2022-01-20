import type { InvestmentsCommandHandler } from '../application/command-handler';
import type { InvestmentsQueryHandler } from '../application/query-handler';
import type { InvestmentsCommand } from '../application/commands';
import type { InvestmentsQuery } from '../application/queries';
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
export class InvestmentsHttpApi {
  constructor(
    private readonly commands: InvestmentsCommandHandler,
    private readonly queries: InvestmentsQueryHandler,
  ) {}
  async handle(req: HttpRequest): Promise<HttpResponse> {
    const auth = req.headers?.authorization;
    if (!auth) return { status: 401, body: { error: 'Unauthorized' } };
    if (req.method === 'POST' && req.path === '/investments/commands') {
      const result = await this.commands.handle(req.body as InvestmentsCommand);
      return { status: result.success ? 200 : 400, body: result };
    }
    if (req.method === 'POST' && req.path === '/investments/queries') {
      const result = await this.queries.handle(req.body as InvestmentsQuery);
      return { status: 200, body: result };
    }
    if (req.method === 'GET' && req.path.startsWith('/investments/')) {
      const id = req.path.split('/').pop()!;
      const result = await this.queries.handle({ type: 'GetInvestmentsById', productId: id });
      return { status: result ? 200 : 404, body: result ?? { error: 'Not found' } };
    }
    return { status: 404, body: { error: 'Route not found' } };
  }
}
