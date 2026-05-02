import TransactionForm from '../components/TransactionForm';
import PageTitle from '../components/PageTitle';

export default function TransactionAdding() {
  return (
    <div>
      <PageTitle before="CREATE" highlight="NEW" />
      <TransactionForm />
    </div>
  );
}
