import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { cartData } from '../../store/slice';

const Products = props => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const count = useSelector(state => console.log(state));
  const dispatch = useDispatch();

  const requestAPI = () => {
    console.log('Request API');

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

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
    </View>
  );

    const renderItem = ({ item, index }) => {
      console.log('index', index)
    return (
      <View style={{flex: 1, margin: 10, backgroundColor: 'white'}}>
        <Text>{item.name}</Text>
        <Text>Rs. {item.price}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Discount Rs. {item.discount}</Text>
          {item.out_of_stock === true ? (
            <TouchableOpacity onPress={() => dispatch(cartData(item))}>
              <Text style={{fontWeight: 'bold'}}>ADD TO CART</Text>
            </TouchableOpacity>
          ) : (
            <Text style={{fontWeight: 'bold'}}>Out of Stock</Text>
          )}
        </View>
      </View>
    );
  };
    

  return (
    <View style={styles.listItem}>
      <FlatList
        data={data}
        renderItem={(item, index) => renderItem(item, index)}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    backgroundColor: 'grey',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Products;
