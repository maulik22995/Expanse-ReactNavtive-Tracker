import {Alert, StyleSheet, View} from 'react-native';
import Input from './Input';
import {Text} from 'react-native-paper';
import {useState} from 'react';
import AppButton from '../Ui/AppButton';
import {getFormatedDate} from '../../utils/date';
import {GlobalStyles} from '../../constants/styles';

function ExpenseForm({isForEdit, onCancel, onSubmit, defaultValue}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormatedDate(defaultValue.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : '',
      isValid: true,
    },
  });
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs(curInputs => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }

  function onSubmitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descIsValid = expenseData.description.toString().length > 0;

    console.log('date is valid ', expenseData.date, dateIsValid);
    console.log('amount is valid ', expenseData.amount, amountIsValid);

    if (!amountIsValid || !dateIsValid || !descIsValid) {
      // Alert.alert('Invalid input', 'Please check valid input values');
      setInputs(curInputs => {
        return {
          amount: {value: curInputs.amount.value, isValid: amountIsValid},
          date: {value: curInputs.date.value, isValid: dateIsValid},
          description: {
            value: curInputs.description.value,
            isValid: descIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expenses</Text>
      <View style={styles.inputRow}>
        <Input
          lebal="Amount"
          style={styles.rowItemInput}
          inValid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input
          lebal="Date"
          style={styles.rowItemInput}
          inValid={!inputs.date.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value,
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
          }}
        />
      </View>
      <Input
        lebal="Description"
        inValid={!inputs.description.isValid}
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value,
          multiline: true,
          autoCorrect: false,
        }}
      />
      {formIsInValid && (
        <Text style={styles.errorText}>
          {' '}
          Invalid Input , Please check all input feilds
        </Text>
      )}
      <View style={styles.buttons}>
        <AppButton style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </AppButton>
        <AppButton style={styles.button} onPress={onSubmitHandler}>
          {isForEdit ? 'Update' : 'Add'}
        </AppButton>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  rowItemInput: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  form: {
    marginTop: 70,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    marginBottom: 20,
  },
});
