import {View, Text, StyleSheet} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

function ExpensesSummary({expenses, periodName}) {
  const expensesSum = expenses
    .map(expense => expense.amount)
    .reduce((sum, amount) => {
      return sum + amount;
    }, 0);

  return (
    <View style={style.container}>
      <Text style={style.periodStyle}>{periodName}</Text>
      <Text style={style.amountStyle}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  periodStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: GlobalStyles.colors.primary800,
  },
  amountStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary800,
  },
});
