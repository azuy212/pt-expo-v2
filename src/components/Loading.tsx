import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <ActivityIndicator
      animating={true}
      color='#84888d'
      size='large'
      hidesWhenStopped={true}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        flex: 1,
      }}
    />
  );
};

export default Loading;
