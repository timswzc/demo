import { Alert } from 'react-native';

export const createAlert = (alertTitle, alertMessage) => {
  Alert.alert(
    alertTitle,
    alertMessage,
    [
      { text: 'OK' }
    ]
  );
};

export const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
