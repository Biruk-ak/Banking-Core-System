import type { MobileBankingCommandHandler } from '../application/command-handler';
import type { MobileBankingQueryHandler } from '../application/query-handler';
import type { MobileBankingCommand } from '../application/commands';
import type { MobileBankingQuery } from '../application/queries';
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
export class MobileBankingHttpApi {
  constructor(
    private readonly commands: MobileBankingCommandHandler,
    private readonly queries: MobileBankingQueryHandler,
  ) {}
  async handle(req: HttpRequest): Promise<HttpResponse> {
    const auth = req.headers?.authorization;
    if (!auth) return { status: 401, body: { error: 'Unauthorized' } };
    if (req.method === 'POST' && req.path === '/mobile-banking/commands') {
      const result = await this.commands.handle(req.body as MobileBankingCommand);
      return { status: result.success ? 200 : 400, body: result };
    }
    if (req.method === 'POST' && req.path === '/mobile-banking/queries') {
      const result = await this.queries.handle(req.body as MobileBankingQuery);
      return { status: 200, body: result };
    }
    if (req.method === 'GET' && req.path.startsWith('/mobile-banking/')) {
      const id = req.path.split('/').pop()!;
      const result = await this.queries.handle({ type: 'GetMobileBankingById', productId: id });
      return { status: result ? 200 : 404, body: result ?? { error: 'Not found' } };
    }
    return { status: 404, body: { error: 'Route not found' } };
  }
}
