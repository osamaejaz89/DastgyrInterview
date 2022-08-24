import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Products from '../Screens/Products';
import Cart from '../Screens/Cart';
import Flight from '../Screens/Flight';
import CartIcon from '../Components/CartIcon';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F53E3D',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#F53E3D',
      }}>
      <Tab.Screen
        name="Flight"
        component={Flight}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="flight" color={color} size={wp(7)} />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="list-alt" color={color} size={wp(7)} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({color}) => (
            <View>
              <Icon name="shopping-cart" color={color} size={wp(7)} />
              <CartIcon />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
