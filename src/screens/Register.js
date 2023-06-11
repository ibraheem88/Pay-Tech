import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, ActivityIndicator,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'

const Register = ({ navigation, route }) => {
  const isSeller = route.params.type === "Seller"
  const [username, setUsername] = useState('');
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');


  const handleRegister = () => {
    setLoading(true);
    fetch("http://146.190.205.245/api/collections/users/records", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        "username": username,
        "email": email,
        "password": password,
        "passwordConfirm": confirmPassword,
        "name": name,
        "isSeller": isSeller
      })
    }).then(res => res.json())
      .then((res) => {
        console.log(res)
        if (res.created) {
          setError('')
          setEmail('');
          setName('');
          setPassword('');
          setConfirmPassword('')
          setUsername('')
          Alert.alert("Success", "Account Created Successfully", [{
            text: 'Ok',
            onPress: () => navigation.replace('Login'),
          }])
        } else {
          const keys = Object.keys(res.data)
          console.log(res.data)
          const err = res.data[keys[0]].message
          setError(keys[0].charAt(0).toUpperCase() + keys[0].slice(1) + ": " + err)
        }
        setLoading(false);
      }).catch(err => console.log("Fetch Error: ", err))

  };

  return (
    <View style={{ backgroundColor: '#031042', flex: 1 }}><View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={require('../assets/logoHeader.jpg')}
      />
    </View>
      <View style={{ borderTopEndRadius: 120, overflow: 'hidden', flex: 1 }}>
        <ScrollView contentContainerStyle={{
          flexGrow: 1, paddingBottom: 40, backgroundColor: 'white'
        }}
          showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView style={styles.container} >
            <Text style={styles.title}>SIGN UP</Text>
            <Text style={styles.error}>{error}</Text>
            <View style={styles.shadow}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={"black"}
                onChangeText={setUsername}
                value={username}
              />
              <Icon name='person' size={22} style={{ position: 'absolute', left: 10 }} />
            </View>
            <View style={styles.shadow}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={"black"}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
              />
              <Icon name='email' size={22} style={{ position: 'absolute', left: 10 }} />
            </View>
            <View style={styles.shadow}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={"black"}
                onChangeText={setName}
                value={name}
              />
              <Icon name='person' size={22} style={{ position: 'absolute', left: 10 }} />
            </View>
            <View style={styles.shadow}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={"black"}
                secureTextEntry={!visible}
                onChangeText={setPassword}
                value={password}
              />
              <Icon name='vpn-key' size={22} style={{ position: 'absolute', left: 10 }} />
              <Icon2 name={visible ? 'eye-off' : 'eye'} size={22} style={{ position: 'absolute', right: 10 }}
                onPress={() => setVisible(!visible)} />
            </View>
            <View style={styles.shadow}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={"black"}
                secureTextEntry={!visible}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
              />
              <Icon name='vpn-key' size={22} style={{ position: 'absolute', left: 10 }} />
              <Icon2 name={visible ? 'eye-off' : 'eye'} size={22} style={{ position: 'absolute', right: 10 }}
                onPress={() => setVisible(!visible)} />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              {loading ? (
                <ActivityIndicator size={18} color="white" />
              ) : (
                <Text style={styles.buttonText}>Proceed</Text>
              )}
            </TouchableOpacity>
            <View
              style={styles.link}
            >
              <Text style={styles.linkText}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={[styles.linkText, { color: '#031042', fontWeight: 'bold', marginLeft: 5 }]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: "white"
  },
  logo: {
    height: 100,
    width: "100%",
    resizeMode: 'cover'
  },
  title: {
    fontSize: 26,
    alignSelf: 'center',
    color: '#031042',
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingLeft: 40,
    paddingVertical: 15,
    color: 'black',
  },
  shadow: {
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    width: '100%',
    marginBottom: 35,
    elevation: 12,
    shadowColor: 'black',
  },
  button: {
    backgroundColor: '#031042',
    borderRadius: 25,
    alignSelf: 'center',
    paddingHorizontal: 60,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  link: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#a6a6a6'
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center'
  }
});
