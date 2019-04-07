import { Alert } from 'react-native';

export function showErrorAlert(title: string, err: any) {
  const error = !err.message ? err : err.message;
  console.log(title, error);
  Alert.alert(title, error);
}
