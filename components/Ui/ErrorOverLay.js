import {Button, StyleSheet, Text, View} from 'react-native';

function ErrorOverLay({message, onConfirm}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occurred!</Text>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={onConfirm} title="Okay" />
    </View>
  );
}

export default ErrorOverLay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
