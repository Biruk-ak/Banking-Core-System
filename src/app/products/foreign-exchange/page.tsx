import { StatCard } from '@/components/StatCard';
import { DataTable } from '@/components/DataTable';

export default function ForeignExchangePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white">Foreign Exchange</h1>
        <p className="mt-2 text-slate-400">
          Banking Core System module for foreign exchange operations, monitoring, and customer workflows.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active items" value="128" hint="Last 24h +4%" />
        <StatCard label="Volume" value="$2.4M" hint="Settled today" />
        <StatCard label="Risk flags" value="7" hint="2 high severity" />
        <StatCard label="SLA" value="99.97%" hint="Rolling 30d" />
      </div>
      <DataTable
        columns={['Reference', 'Customer', 'Amount', 'Status', 'Updated']}
        rows={[
          ['BCS-10021', 'C-8841', '$1,200.00', 'Completed', 'Today'],
          ['BCS-10022', 'C-2290', '$450.50', 'Pending', 'Today'],
          ['BCS-10023', 'C-1102', '$9,800.00', 'Review', 'Yesterday'],
          ['BCS-10024', 'C-5521', '$75.00', 'Completed', 'Yesterday'],
        ]}
      />
    </div>
  );
}
