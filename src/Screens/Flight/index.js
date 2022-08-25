import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  RefreshControl,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {renderEmpty} from '../../Utils/constant';
import {useLinkTo} from '@react-navigation/native';

const Flight = props => {
  const [page, setPage] = useState(1);
  const [moreLoading, setMoreLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flightData, setFlightData] = useState([]);
  const [pageLimit, setPageLimit] = useState(100);

  const linkTo = useLinkTo();

  const requestAPI = pageNumber => {
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

  const renderFooter = () => (
    <ActivityIndicator size={'small'} animating={moreLoading} />
  );

  const renderItem = ({item}) => {
    return (
      <View style={styles.renderStyleView}>
        <View style={styles.flexStyle}>
          <Text style={styles.textFontWeight}>Passenger Name: {item.name}</Text>
          <Text style={styles.textFontWeight}>No of Trips: {item.trips}</Text>
        </View>

        <View>
          {item.airline.map((i, t) => {
            const handleClick = async () => {
              await Linking.canOpenURL('https://' + i.website).then(
                supported => {
                  if (supported) {
                    Linking.openURL('https://' + i.website);
                  } else {
                    console.log(
                      "Don't know how to open URI: " + 'https://' + i.website,
                    );
                  }
                },
              );
            };
            return (
              <View key={t}>
                <View style={styles.flexStyle}>
                  <Text style={styles.textFontWeight}>{i.name}</Text>
                  <Text style={styles.textFontWeight}>{i.country}</Text>
                </View>
                <View style={styles.flexColStyle}>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: i.logo,
                    }}
                  />
                  <Text style={styles.slogan}>{i.slogan}</Text>
                </View>
                <Text style={styles.headQuartersStyle}>{i.head_quaters}</Text>
                <View style={styles.flexStyle}>
                  <Text
                    style={{color: 'blue', textDecorationLine: 'underline'}}
                    onPress={handleClick}>
                    {i.website}
                  </Text>
                  <Text style={styles.textFontWeight}>{i.established}</Text>
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
      <Text style={styles.heading}>Passenger Data</Text>
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
        ListEmptyComponent={renderEmpty(loading)}
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
    backgroundColor: '#E6E7EC',
  },
  logo: {
    width: wp(45),
    height: hp(8),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  renderStyleView: {
    flex: 1,
    margin: wp(3),
    backgroundColor: 'white',
    borderWidth: wp(0.1),
    borderRadius: wp(3),
    padding: wp(3),
  },
  heading: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: wp(10),
    fontWeight: 'bold',
    color: 'black',
  },
  slogan: {
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  flexStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textFontWeight: {fontWeight: 'bold'},
  flexColStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headQuartersStyle: {
    textAlign: 'center',
    marginTop: wp(5),
    fontWeight: 'bold',
  },
});

export default Flight;
