import {useContext, useEffect, useState} from 'react';
import ExpensesOutput from '../components/expenses-output/ExpensesOutput';
import {ExpenseContext} from '../store/excpense-context';
import {getDateMinusDays} from '../utils/date';
import {fetchExpense} from '../utils/http';
import LoadingOverLay from '../components/Ui/LoadingOverLay';
import ErrorOverLay from '../components/Ui/ErrorOverLay';

function RecentExpenses() {
  const expenseCtx = useContext(ExpenseContext);
  const [isFetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getExpense() {
      setFetching(true);
      try {
        const expenses = await fetchExpense();
        expenseCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch exprenses!');
      }
      setFetching(false);
    }
    getExpense();
  }, []);

  const recentExpense = expenseCtx.expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverLay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverLay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpense}
      periodName="Lasr 7 days"
      fallBackText="No expenses registered for last 7 days"
    />
  );
}

export default RecentExpenses;
