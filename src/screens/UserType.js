import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const UserType = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/logoHeader.jpg')} />
      <View style={{
        borderTopEndRadius: 120, overflow: 'hidden', flex: 1, justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
        <Text style={styles.title}>Are you a Service Provider or a Bussiness Owner?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register', { type: 'Seller' })}
        >
          <Text style={styles.buttonText}>Register as a Service Provider</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register', { type: 'Buyer' })}
        >
          <Text style={styles.buttonText}>Register as a Business Owner </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#031042', flex: 1

  },
  title: {
    fontSize: 20,
    paddingHorizontal: 50,
    color: 'black',
    marginBottom: 20,
  },
  logo: {
    height: 100,
    width: "100%",
    resizeMode: 'cover'
  },
  button: {
    backgroundColor: '#031042',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserType;