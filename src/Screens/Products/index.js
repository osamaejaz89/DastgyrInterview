import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {cartData} from '../../store/slice';
import {renderEmpty} from '../../Utils/constant';

const Products = props => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

    const requestAPI = () => {
      setLoading(true)
    fetch(`https://cb127da4-fd0b-4da0-8dfd-e007eb81a901.mock.pstmn.io/cart`)
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    requestAPI();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderViewStyle}>
        <Text style={styles.textFontWeight}>{item.name}</Text>
        <Text>Rs. {item.price}</Text>
        <View style={styles.flexStyle}>
          <Text>Discount Rs. {item.discount}</Text>
          {item.out_of_stock === true ? (
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => dispatch(cartData(item))}>
              <Text style={[styles.textFontWeight, {color: 'white'}]}>ADD TO CART</Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.textFontWeight, {color: 'black'}]}>Out of Stock</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.listItem}>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              requestAPI();
            }}
          />
        }
        renderItem={(item, index) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={renderEmpty(loading)}
      />
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
    backgroundColor: '#F53E3D',
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
});

export default Products;
