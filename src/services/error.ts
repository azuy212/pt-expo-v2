import { Alert } from 'react-native';

export function showErrorAlert(msg: string, err: any) {
  const error = !err.message ? err : err.message;
  console.log(msg, error);
  Alert.alert(msg, error);
}
