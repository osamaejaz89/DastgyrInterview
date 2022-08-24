import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from "react-native-vector-icons/FontAwesome";

import Products from '../Screens/Products';
import Cart from '../Screens/Cart/Cart';
import Flight from '../Screens/Flight';

// import CartIcon from "../Shared/CartIcon";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Flight"
        component={Flight}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Icon name="home" color={color} size={30} />
        //   ),
        // }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Icon name="home" color={color} size={30} />
        //   ),
        // }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <View>
        //       <Icon name="shopping-cart" color={color} size={30} />
        //       <CartIcon />
        //     </View>
        //   ),
        // }}
      />
    </Tab.Navigator>
  );
};

export default Main;
