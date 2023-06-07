import React from 'react';
import { View, Text } from 'react-native';

const PermissionsLoadingComponent = () => {
  return (
    <View style={{
      flex:1,
      alignItems:"center",
      justifyContent:"center"
    }}>
      <Text style={{ textAlign: 'center' }}>
        Getting permissions...
      </Text>
    </View>
  )
}

export default PermissionsLoadingComponent
