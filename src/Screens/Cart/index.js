import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {removeCart} from '../../store/slice';

const Cart = props => {
  const {cartData} = useSelector(state => state.cart);

  const dispatch = useDispatch();

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>Please add item into Cart</Text>
    </View>
  );

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderViewStyle}>
        <Text style={styles.textFontWeight}>{item.name}</Text>
        <Text>Rs. {item.price}</Text>
        <View style={styles.flexStyle}>
          <Text style={styles.textFontWeight}>
            Discount Rs. {item.discount}
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => dispatch(removeCart(index))}>
            <Text style={[styles.textFontWeight, {color: '#F53E3D'}]}>
              Remove from Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const getTotal = () => {
    let totalDiscountPrice = 0;
    let totalDiscount = 0;
    let totalPrice = 0;
    cartData.forEach(item => {
      totalPrice += item.price;
      totalDiscount += item.discount;
    });
    totalDiscountPrice = totalPrice - totalDiscount;
    return {totalPrice, totalDiscountPrice};
  };
  return (
    <View style={styles.listItem}>
      <FlatList
        data={cartData}
        renderItem={(item, index) => renderItem(item, index)}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={renderEmpty}
      />
      {cartData.length !== 0 && (
        <View style={styles.cartFlexStyle}>
          <View>
            <Text style={[styles.textFontWeight, {color: 'white'}]}>
              Total Price: {getTotal().totalPrice}
            </Text>
            <Text style={[styles.textFontWeight, {color: 'white'}]}>
              Discounted Price: {getTotal().totalDiscountPrice}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.buttonStyle, {backgroundColor: 'white'}]}>
            <Text style={[styles.textFontWeight, {color: '#F53E3D'}]}>
              Check Out
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    backgroundColor: '#E6E7EC',
  },
  buttonStyle: {
    borderWidth: wp(0.1),
    borderRadius: wp(2),
    padding: wp(2),
    backgroundColor: 'white',
  },
  textFontWeight: {fontWeight: 'bold'},
  renderViewStyle: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: wp(0.1),
    margin: wp(2),
    borderRadius: wp(2),
    padding: wp(5),
  },
  flexStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartFlexStyle: {
    backgroundColor: '#F53E3D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(5),
    borderTopWidth: wp(0.2),
  },
  emptyText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cart;
