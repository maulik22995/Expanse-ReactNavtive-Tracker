import {useContext, useLayoutEffect, useState} from 'react';
import {GlobalStyles} from '../constants/styles';
import IconButton from '../components/Ui/IconButton';
import AppButton from '../components/Ui/AppButton';
import App from '../App';
import {ExpenseContext} from '../store/excpense-context';
import ExpenseForm from '../components/manage-expense/ExpenseForm';
import {deleteExpense, storeExpense, updateExpense} from '../utils/http';
import LoadingOverLay from '../components/Ui/LoadingOverLay';
import ErrorOverLay from '../components/Ui/ErrorOverLay';

const {Text, View, StyleSheet} = require('react-native');

function ManageExpenses({navigation, route}) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const expenseCtx = useContext(ExpenseContext);

  const expenseId = route.params?.expenseID;

  const isForEdit = !!expenseId;

  const selectedExpense = expenseCtx.expenses.find(
    expense => expense.id === expenseId,
  );

  async function deleteExpenseHandler() {
    setSubmitting(true);
    try {
      expenseCtx.deleteExpense(expenseId);
      await deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete error - please try again later');
      setSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setSubmitting(true);
    try {
      if (isForEdit) {
        expenseCtx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({...expenseData, id: id});
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try later');
      setSubmitting(false);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isForEdit ? 'Edit Expense' : 'Add Expense',
    });
  }, [isForEdit, navigation]);

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverLay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverLay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        isForEdit={isForEdit}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
      />
      {isForEdit && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  deleteContainer: {
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
    marginTop: 10,
  },
});
