import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleLogin = () => {
    // if (email == 'kamran@gmail.com' && password == 'akmalbestkeeper') {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Home');
    }, 2000);
    // }
  };

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsRegistering(false);
      setEmail('');
      setName('');
      setPassword('');
    }, 2000);
  };

  const handleForgotPassword = () => {
    // handle forgot password logic
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: 'data:image/png;base64,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',
          }}
        />
      </View>
      {isRegistering ? (
        <View>
          <Text style={styles.title}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={setName}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            {loading ? (
              <ActivityIndicator size={18} color="white" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => setIsRegistering(false)}>
            <Text style={styles.linkText}>
              Already have an account? Login here.
            </Text>
          </TouchableOpacity>
        </View>
      ) : isForgotPassword ? (
        <View>
          <Text style={styles.title}>Forgot Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => setIsForgotPassword(false)}>
            <Text style={styles.linkText}>
              Remembered your password? Login here.
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Login</Text>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              style={styles.socialIcon}
              source={{
                uri: 'https://www.facebook.com/images/fb_icon_325x325.png',
              }}
            />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              style={styles.socialIcon}
              source={{
                uri: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png',
              }}
            />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.line} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size={18} color="white" />
            ) : (
              <Text style={styles.buttonText}>login</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => setIsForgotPassword(true)}>
            <Text style={styles.linkText}>Forgot your password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => setIsRegistering(true)}>
            <Text style={styles.linkText}>
              Don't have an account? Register here.
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0095f6',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  socialButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  orText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
  },
  link: {
    alignSelf: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#999',
    textDecorationLine: 'underline',
  },
});

export default Login;
