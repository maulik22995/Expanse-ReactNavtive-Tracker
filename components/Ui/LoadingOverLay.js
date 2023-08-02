import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {GlobalStyles} from '../../constants/styles';

function LoadingOverLay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={GlobalStyles.colors.primary500} />
    </View>
  );
}

export default LoadingOverLay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
});
