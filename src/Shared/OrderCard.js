import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const codes = [
  { name: "pending", code: "3" },
  { name: "shipped", code: "2" },
  { name: "delivered", code: "1" },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();



  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.container}>
        <Text>Order Number: #ORDER</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status: 
        </Text>
        <Text>
          Address: 
        </Text>
        <Text>City: </Text>
        <Text>Country: </Text>
        <Text>Date Ordered: </Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.price}>$ 20</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62B1F6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OrderCard;
