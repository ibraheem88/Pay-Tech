import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import { setUserInfo } from '../state/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';

const AddPayment = ({ navigation }) => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [coins, setCoins] = useState(0)
  const [selected, setSelected] = useState(0)
  const [loading, setLoading] = useState(false)
  const [validCard, setValidCard] = useState(false)
  const packages = [1000, 5000, 10000, 25000, 50000, 100000]

  const addCoins = () => {
    let newcoins = packages[selected] + user.points
    fetch(`http://146.190.205.245/api/collections/users/records/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        points: newcoins
      })
    }).then(res => res.json())
      .then(res => {
        dispatch(setUserInfo({ ...user, points: newcoins }))
        Alert.alert("", `Coins Added to Wallet!`, [{
          text: 'Ok',
          onPress: () => navigation.goBack(),
        }])
      }).catch(err => console.log("Fetch Error: ", err))
  }

  const checkValid = (card) => {
    if (card.complete) {
      setValidCard(true)
    }
    else {
      setValidCard(false)
    }
  }



  return (
    <View style={{ padding: 10, justifyContent: 'center', flex: 1 }}>
      <FlatList
        data={packages}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={{
            flexDirection: 'row', marginRight: 10, alignItems: 'center', justifyContent: 'center',
            padding: 30, borderColor: selected === index ? '#031042' : 'lightgrey', borderWidth: 1, borderRadius: 8, backgroundColor: 'white'
          }}
            onPress={() => setSelected(index)}>
            <Icon2 name='currency-rupee' size={22} color={"#FFA500"} />
            <Text style={{ color: 'black', marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <CardField
        postalCodeEnabled={false}
        onCardChange={(card) => checkValid(card)}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
      />
      <Pressable onPress={() => addCoins()}
        disabled={!validCard || loading}
        style={styles.button} >
        <Text style={styles.buttonText}>CONFIRM</Text>
      </Pressable>
    </View>)
}

export default AddPayment;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#031042',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});