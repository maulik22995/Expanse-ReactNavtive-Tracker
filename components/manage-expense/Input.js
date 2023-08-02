import {GlobalStyles} from '../../constants/styles';

const {View, Text, StyleSheet} = require('react-native');
const {TextInput} = require('react-native-paper');

function Input({lebal, style, textInputConfig, inValid}) {
  const inputStyle = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiLine);
  }

  if (inValid) {
    inputStyle.push(styles.errorInput);
  }

  return (
    <View style={[style, styles.container]}>
      <Text style={[styles.label, inValid && styles.errorLebal]}>{lebal}</Text>
      <TextInput style={inputStyle} {...textInputConfig}></TextInput>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 12,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: GlobalStyles.colors.primary500,
  },
  input: {
    fontSize: 18,
    color: '#000000',
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 20,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  errorLebal: {
    color: GlobalStyles.colors.error500,
  },
  errorInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
