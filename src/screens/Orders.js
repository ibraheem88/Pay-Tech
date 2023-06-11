import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../state/actions/userActions';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import AnimatedLottieView from 'lottie-react-native';

const GigCard = ({ id, navigation }) => {

  const { user } = useSelector(state => state.user)
  const [seller, setSeller] = useState({})
  const [order, setOrder] = useState({})

  const getOrderDetail = async () => {
    //setLoading(true);
    fetch(`http://146.190.205.245/api/collections/orders/records/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        setOrder(res)
        getSeller(res)
      }).catch(err => console.log("Fetch Error: ", err))
  }

  const getSeller = (order) => {
    fetch(`http://146.190.205.245/api/collections/users/records/${user.isSeller ? order.buyer : order.seller}`, {
      method: "GET"
    }).then(res => res.json())
      .then((res) => {
        console.log(res, 'res')
        setSeller(res)
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleOrder = (status) => {
    fetch(`http://146.190.205.245/api/collections/orders/records/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        status: status
      })
    }).then(res => res.json())
      .then(res => {
        setOrder(res)
        alert(`Order ${status}`)
      }).catch(err => console.log("Fetch Error: ", err))
  }

  useEffect(() => {
    getOrderDetail()
  }, [])

  return (
    <>
      <View style={{ backgroundColor: 'white', padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#BEBEBE' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: seller.avatar?.length > 1 ? `http://146.190.205.245/api/files/_pb_users_auth_/${seller.id}/${seller.avatar}` : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" }}
            style={{ height: 50, width: 50, borderRadius: 25 }} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontSize: 16, color: 'black', marginLeft: 10, fontWeight: 'bold' }}>{seller.name}</Text>
          </View>
        </View>
        <Icon name="chat" size={28} color={"#031042"} style={{ marginRight: 10 }} onPress={() => navigation.navigate('Chat Room', { seller })} />
      </View>
      <TouchableOpacity style={styles.card} onPress={() => order.status === 'Active' && navigation.navigate('Order Detail', { order })}>
        <View style={styles.details}>
          <Text style={styles.name}>{order.name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ padding: 10, backgroundColor: order.status === 'Pending' && moment(new Date()).diff(moment(order.created), 'days') > 1 ? '#B41F25' : order.status === 'Pending' ? 'orange' : order.status === 'Active' ? '#07d6db' : '#049b4b', borderRadius: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'white' }}>{order.status == 'Pending' && moment(new Date()).diff(moment(order.created), 'days') > 1 ? "Cancelled" : order.status}</Text>
            </View>
            <View style={{ marginTop: 10, alignSelf: 'flex-end', marginRight: 10, flexDirection: 'row', alignItems: 'center' }}>
              <Icon2 name='coins' size={16} color={"#FFA500"} />
              <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold', marginLeft: 5 }}>{order.amount}</Text>
            </View>
          </View>
          {user.isSeller && order.status === 'Pending' && moment(new Date()).diff(moment(order.created), 'days') < 1 && <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#66cc00', borderRadius: 10, width: '45%', alignItems: 'center' }}
              onPress={() => handleOrder('Active')}>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#e03e1e', borderRadius: 10, width: '45%', alignItems: 'center' }}
              onPress={() => handleOrder('Cancelled')}>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
          </View>}
          <Text>{moment(order.created).fromNow()}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};



const Orders = ({ navigation }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const updateUser = () => {
    fetch(`http://146.190.205.245/api/collections/users/records/${user.id}`, {
      method: "GET"
    }).then(res => res.json())
      .then((res) => {
        setIsRefreshing(false)
        dispatch(setUserInfo({ token: user.token, email: user.email, ...res }))
      }).catch((err) => {
        setIsRefreshing(false)
        console.log(err)
      })
  }


  const handleRefresh = () => {
    updateUser()
  }

  return (
    <View style={styles.container}>
      <View style={{ borderTopEndRadius: 40, backgroundColor: 'white', borderTopStartRadius: 40, overflow: 'hidden', flex: 1, paddingHorizontal: 10 }}>
        <FlatList
          contentContainerStyle={{ paddingVertical: 20, borderTopStartRadius: 10 }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{
              flex: 1, justifyContent: 'center'
            }}>
              <AnimatedLottieView
                style={{
                  alignSelf: 'center',
                  height: 250, width: 250
                }}
                source={require('../assets/empty.json')}
                autoPlay
                loop
              />
              <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold' }}>No Orders Available</Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["green"]} // for android
              tintColor={"green"} // for ios
            />
          }
          data={user?.orders}
          renderItem={({ item }) => (
            <View style={styles.shadow}>
              <GigCard navigation={navigation} id={item} />
            </View>
          )}
        />
      </View>
    </View>
  );

}

export default Orders;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#031042', flex: 1, paddingTop: 10
  },
  shadow: {
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    marginHorizontal: 8,
    marginBottom: 35,
    elevation: 12,
    shadowColor: 'black',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
  },
  social: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  socialText: {
    fontSize: 14,
    color: 'black',
  },
  button: {
    backgroundColor: '#031042',
    borderRadius: 10,
    marginHorizontal: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
