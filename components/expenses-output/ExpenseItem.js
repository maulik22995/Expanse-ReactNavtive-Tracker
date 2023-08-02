import {Pressable, View, Text, StyleSheet} from 'react-native';
import {GlobalStyles} from '../../constants/styles';
import {getFormatedDate} from '../../utils/date';
import {useNavigation} from '@react-navigation/native';

function ExpenseItem({id, description, amount, date}) {
  const navigation = useNavigation();
  function expenseItemClick() {
    navigation.navigate('ManageExpenses', {
      expenseID: id,
    });
  }

  return (
    <Pressable
      onPress={expenseItemClick}
      style={({pressed}) => pressed && style.pressed}>
      <View style={style.mainContainer}>
        <View>
          <Text style={[style.textBase, style.description]}>{description}</Text>
          <Text style={style.textBase}>{getFormatedDate(date)}</Text>
        </View>
        <View style={style.priceContainer}>
          <Text style={style.amount}>${amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const style = StyleSheet.create({
  mainContainer: {
    padding: 8,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.error50,
  },
  textBase: {
    color: GlobalStyles.colors.gray700,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: GlobalStyles.colors.accent500,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    minWidth: 100,
  },
  amount: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
});
