import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeCart} from '../../store/slice';

var {height, width} = Dimensions.get('window');

const Cart = props => {
  const {cartData} = useSelector(state => state.counter);

  const dispatch = useDispatch();
  console.log(cartData);

  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 1, margin: 10, backgroundColor: 'white'}}>
        <Text>{item.name}</Text>
        <Text>Rs. {item.price}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Discount Rs. {item.discount}</Text>
          <TouchableOpacity onPress={() => dispatch(removeCart(index))}>
            <Text style={{fontWeight: 'bold'}}>Remove from Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={cartData}
        renderItem={(item, index) => renderItem(item, index)}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: 'red',
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default Cart;
