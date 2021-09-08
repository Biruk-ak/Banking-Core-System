import type { CreditCardsCommandHandler } from '../application/command-handler';
import type { CreditCardsQueryHandler } from '../application/query-handler';
import type { CreditCardsCommand } from '../application/commands';
import type { CreditCardsQuery } from '../application/queries';
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
export class CreditCardsHttpApi {
  constructor(
    private readonly commands: CreditCardsCommandHandler,
    private readonly queries: CreditCardsQueryHandler,
  ) {}
  async handle(req: HttpRequest): Promise<HttpResponse> {
    const auth = req.headers?.authorization;
    if (!auth) return { status: 401, body: { error: 'Unauthorized' } };
    if (req.method === 'POST' && req.path === '/credit-cards/commands') {
      const result = await this.commands.handle(req.body as CreditCardsCommand);
      return { status: result.success ? 200 : 400, body: result };
    }
    if (req.method === 'POST' && req.path === '/credit-cards/queries') {
      const result = await this.queries.handle(req.body as CreditCardsQuery);
      return { status: 200, body: result };
    }
    if (req.method === 'GET' && req.path.startsWith('/credit-cards/')) {
      const id = req.path.split('/').pop()!;
      const result = await this.queries.handle({ type: 'GetCreditCardsById', productId: id });
      return { status: result ? 200 : 404, body: result ?? { error: 'Not found' } };
    }
    return { status: 404, body: { error: 'Route not found' } };
  }
}
