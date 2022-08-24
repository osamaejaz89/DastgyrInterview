import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CartItem = props => {
  return (
    <View style={styles.listItem} key={Math.random()}>
      <Text>Cart Item</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default CartItem;
