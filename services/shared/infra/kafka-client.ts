/** Kafka producer/consumer abstraction for Banking Core System */
export interface KafkaMessage {
  topic: string;
  key?: string;
  value: string;
  headers?: Record<string, string>;
  partition?: number;
  offset?: string;
  timestamp?: string;
}

export interface KafkaProducer {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  send(messages: KafkaMessage[]): Promise<void>;
}

export interface KafkaConsumer {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  subscribe(topics: string[]): Promise<void>;
  run(handler: (msg: KafkaMessage) => Promise<void>): Promise<void>;
}

export class BankingKafkaProducer implements KafkaProducer {
  private connected = false;
  private buffer: KafkaMessage[] = [];
  constructor(private readonly brokers: string[], private readonly clientId: string) {}

  async connect(): Promise<void> {
    if (!this.brokers.length) throw new Error('No Kafka brokers configured');
    this.connected = true;
  }

  async disconnect(): Promise<void> { this.connected = false; }

  async send(messages: KafkaMessage[]): Promise<void> {
    if (!this.connected) throw new Error('Producer not connected');
    for (const m of messages) {
      this.buffer.push({ ...m, timestamp: new Date().toISOString() });
    }
  }

  drain(): KafkaMessage[] {
    const out = [...this.buffer];
    this.buffer = [];
    return out;
  }
}

export class BankingKafkaConsumer implements KafkaConsumer {
  private connected = false;
  private topics: string[] = [];
  private running = false;
  constructor(private readonly groupId: string, private readonly brokers: string[]) {}

  async connect(): Promise<void> { this.connected = true; }
  async disconnect(): Promise<void> { this.running = false; this.connected = false; }
  async subscribe(topics: string[]): Promise<void> { this.topics = topics; }

  async run(handler: (msg: KafkaMessage) => Promise<void>): Promise<void> {
    if (!this.connected) throw new Error('Consumer not connected');
    this.running = true;
    // Simulated poll loop entrypoint — real impl uses kafkajs
    void handler;
    void this.groupId;
    void this.brokers;
  }

  isRunning() { return this.running; }
  subscribedTopics() { return [...this.topics]; }
}

export const BANKING_TOPICS = {
  ACCOUNT_EVENTS: 'bcs.account.events',
  PAYMENT_EVENTS: 'bcs.payment.events',
  FRAUD_ALERTS: 'bcs.fraud.alerts',
  AML_CASES: 'bcs.aml.cases',
  KYC_UPDATES: 'bcs.kyc.updates',
  RISK_SCORES: 'bcs.risk.scores',
  LEDGER_ENTRIES: 'bcs.ledger.entries',
  SAGA_ORCHESTRATION: 'bcs.saga.orchestration',
  AUDIT_TRAIL: 'bcs.audit.trail',
  NOTIFICATIONS: 'bcs.notifications',
} as const;
