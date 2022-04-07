import type { InsuranceCommandHandler } from '../application/command-handler';
import type { InsuranceQueryHandler } from '../application/query-handler';
import type { InsuranceCommand } from '../application/commands';
import type { InsuranceQuery } from '../application/queries';
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
export class InsuranceHttpApi {
  constructor(
    private readonly commands: InsuranceCommandHandler,
    private readonly queries: InsuranceQueryHandler,
  ) {}
  async handle(req: HttpRequest): Promise<HttpResponse> {
    const auth = req.headers?.authorization;
    if (!auth) return { status: 401, body: { error: 'Unauthorized' } };
    if (req.method === 'POST' && req.path === '/insurance/commands') {
      const result = await this.commands.handle(req.body as InsuranceCommand);
      return { status: result.success ? 200 : 400, body: result };
    }
    if (req.method === 'POST' && req.path === '/insurance/queries') {
      const result = await this.queries.handle(req.body as InsuranceQuery);
      return { status: 200, body: result };
    }
    if (req.method === 'GET' && req.path.startsWith('/insurance/')) {
      const id = req.path.split('/').pop()!;
      const result = await this.queries.handle({ type: 'GetInsuranceById', productId: id });
      return { status: result ? 200 : 404, body: result ?? { error: 'Not found' } };
    }
    return { status: 404, body: { error: 'Route not found' } };
  }
}
