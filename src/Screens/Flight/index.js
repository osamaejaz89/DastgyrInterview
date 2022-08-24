import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  RefreshControl,
} from 'react-native';

const Flight = props => {
  const [page, setPage] = useState(1);
  const [moreLoading, setMoreLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flightData, setFlightData] = useState([]);
  const [pageLimit, setPageLimit] = useState(100);

  const requestAPI = pageNumber => {
    console.log('Request API');
    if (pageNumber === 1) {
      setLoading(true);
    } else {
      setMoreLoading(true);
    }
    fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${pageNumber}&size=10`,
    )
      .then(response => response.json())
      .then(json => {
        if (pageNumber === 1) {
          setPageLimit(json.totalPages); // ye page limit page 1 pe is liye set karwaayi hai k aik baar page limit set hojaye, baar baar na ho.
          setFlightData(json.data);
        } else {
          setFlightData(curr => [...curr, ...json.data]);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setMoreLoading(false);
      });
  };

  useEffect(() => {
    requestAPI(page);
  }, []);

  const renderEmpty = () => !loading && <Text>No Data at the moment</Text>;

  const renderFooter = () => (
    <ActivityIndicator size={'small'} animating={moreLoading} />
  );

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          margin: 10,
          backgroundColor: 'white',
          borderWidth: 1,
          borderRadius: 10,
          padding: 5,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>Passenger Name: {item.name}</Text>
          <Text>No of Trips: {item.trips}</Text>
        </View>

        <View>
          {item.airline.map((i, t) => {
            return (
              <View key={t}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{i.name}</Text>
                  <Text>{i.country}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: i.logo,
                    }}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    {i.slogan}
                  </Text>
                </View>
                <Text style={{textAlign: 'center'}}>{i.head_quaters}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{i.website}</Text>
                  <Text>{i.established}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.listItem}>
      <Text style={{justifyContent: 'center', alignSelf: 'center'}}>
        Passenger Data
      </Text>
      <FlatList
        data={flightData}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              requestAPI(1);
            }}
          />
        }
        renderItem={(item, index) => renderItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          if (page <= pageLimit) {
            requestAPI(page + 1);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  emptyText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Flight;
