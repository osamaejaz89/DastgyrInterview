import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CartIcon = props => {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    top: -4,
    right: -15,
  },
  text: {
    fontSize: 12,
    width: 100,
    fontWeight: 'bold',
  },
});

export default CartIcon;
