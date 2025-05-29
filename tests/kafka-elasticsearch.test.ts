import { BankingKafkaProducer, BANKING_TOPICS } from '../services/shared/infra/kafka-client';
import { InMemoryElasticsearch } from '../services/shared/infra/elasticsearch';

describe('Kafka and Elasticsearch', () => {
  test('producer buffers messages', async () => {
    const p = new BankingKafkaProducer(['localhost:9092'], 'bcs');
    await p.connect();
    await p.send([{ topic: BANKING_TOPICS.FRAUD_ALERTS, value: '{"x":1}' }]);
    expect(p.drain()).toHaveLength(1);
  });

  test('elasticsearch index search', async () => {
    const es = new InMemoryElasticsearch();
    await es.index('customers', '1', { name: 'Biruk', country: 'ET' });
    const res = await es.search<{ name: string }>('customers', { match: { name: 'bir' } });
    expect(res.hits.total.value).toBe(1);
  });
});
