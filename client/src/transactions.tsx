import * as React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { graphql, compose } from 'react-apollo';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import getTransactions from './queries/transactions';
import addTransaction from './mutations/add';
import removeTransaction from './mutations/remove';
import { withHandlers } from 'recompose';
import Button from 'material-ui/Button';

interface ITransaction {
  id: string;
  amount: number;
  createdAt: string;
  title: string;
}

interface ITransactionsProps {
  transactions: ITransaction[];
  loading: boolean;
  submit: (e: any) => void;
  remove: (id: string) => any;
}

const Transactions = (props: ITransactionsProps) => {
  if (props.loading) {
    return <div>Loading...</div>;
  }
  const renderTransaction = (transaction: any) => (
    <ListItem key={transaction.id}>
      <Avatar>
        {transaction.amount > 0 ? '+' : '-'}
      </Avatar>
      <ListItemText
        primary={transaction.amount}
        secondary={transaction.title}
      />
      <ListItemSecondaryAction>
        <Button
          color="secondary"
          onClick={props.remove(transaction.id)}
        >
          del
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
  return (
    <div style={{ width: 300 }}>
      <b>Balance: {props.transactions.reduce((s: number, t: ITransaction) => s + t.amount, 0)}</b>
      <form
        id="add-transaction"
        method="POST"
        onSubmit={props.submit}
      >
        <TextField
          name="amount"
          label="Amount"
          helperText="e.g. 123 or -123"
          type="number"
          fullWidth
        />
        <TextField
          name="title"
          label="Title"
          helperText="Title your transaction"
          fullWidth
        />
        <div style={{ height: 1, marginBottom: '1rem' }} />
        <Button
          type="submit"
          color="primary"
          fullWidth
        >
          add
        </Button>
      </form>
      <List className="transactions">
        {props.transactions.map((transaction: any) => renderTransaction(transaction))}
      </List>
    </div>
  );
};

export default compose(
  graphql(getTransactions, {
    props: (data: any) => ({
      transactions: data.data.transactions,
      loading: data.data.loading,
    }),
  }),
  graphql(addTransaction, { name: 'addTransaction' }),
  graphql(removeTransaction, { name: 'removeTransaction' }),
  withHandlers({
    submit: (props: any) => (e: any) => {
      e.preventDefault();
      props.addTransaction({
        variables: {
          title: e.target.title.value,
          amount: +e.target.amount.value,
        },
        refetchQueries: [{ query: getTransactions }],
      }).then((_: any) => {
        const form: any = document.querySelector('#add-transaction');
        form.reset();
      });
      return false;
    },
    remove: (props: any) => (id: string) => (e: any) => {
      props.removeTransaction({
        variables: { id },
        refetchQueries: [{ query: getTransactions }],
      });
    },
  }),
)(Transactions);
