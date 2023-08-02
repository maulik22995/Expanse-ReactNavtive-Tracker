import {useContext} from 'react';
import ExpensesOutput from '../components/expenses-output/ExpensesOutput';
import {ExpenseContext} from '../store/excpense-context';

const {Text} = require('react-native');

function AllExpenses() {
  const expenseCtx = useContext(ExpenseContext);

  return (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      periodName="Total"
      fallBackText="No expenses registered"
    />
  );
}

export default AllExpenses;
