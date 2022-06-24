import type { InternetBankingCommandHandler } from '../application/command-handler';
import type { InternetBankingQueryHandler } from '../application/query-handler';
import type { InternetBankingCommand } from '../application/commands';
import type { InternetBankingQuery } from '../application/queries';
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
export class InternetBankingHttpApi {
  constructor(
    private readonly commands: InternetBankingCommandHandler,
    private readonly queries: InternetBankingQueryHandler,
  ) {}
  async handle(req: HttpRequest): Promise<HttpResponse> {
    const auth = req.headers?.authorization;
    if (!auth) return { status: 401, body: { error: 'Unauthorized' } };
    if (req.method === 'POST' && req.path === '/internet-banking/commands') {
      const result = await this.commands.handle(req.body as InternetBankingCommand);
      return { status: result.success ? 200 : 400, body: result };
    }
    if (req.method === 'POST' && req.path === '/internet-banking/queries') {
      const result = await this.queries.handle(req.body as InternetBankingQuery);
      return { status: 200, body: result };
    }
    if (req.method === 'GET' && req.path.startsWith('/internet-banking/')) {
      const id = req.path.split('/').pop()!;
      const result = await this.queries.handle({ type: 'GetInternetBankingById', productId: id });
      return { status: result ? 200 : 404, body: result ?? { error: 'Not found' } };
    }
    return { status: 404, body: { error: 'Route not found' } };
  }
}
