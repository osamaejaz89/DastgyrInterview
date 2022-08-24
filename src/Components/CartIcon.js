import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

const CartIcon = props => {
  const {cartData} = useSelector(state => state.cart);

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>
        {cartData.length > 0 ? cartData.length : null}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: wp(25),
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    top: wp(-2),
    right: wp(-20),
  },
  text: {
    fontSize: wp(4),
    width: wp(20),
    color: 'black',
    fontWeight: 'bold',
  },
});

export default CartIcon;
