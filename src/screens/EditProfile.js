import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../state/actions/userActions';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Octicons'
import Icon3 from 'react-native-vector-icons/MaterialIcons'

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [image, setImage] = useState({})
  const [social, setSocial] = useState(user.social.length == 0 ? [''] : user.social);
  const [loading, setLoading] = useState(false);

  const updateUser = () => {
    fetch(`http://146.190.205.245/api/collections/users/records/${user.id}`, {
      method: "GET"
    }).then(res => res.json())
      .then((res) => {
        dispatch(setUserInfo({ token: user.token, ...res }))
      }).catch((err) => {
        console.log(err)
      })
  }

  handleSave = () => {
    const newSocial = [...social.filter(item => item.length > 3)]
    setLoading(true);
    const form = new FormData()
    form.append('name', name)
    form.append('username', username)
    form.append('social', user.social)
    if (image.uri) {
      form.append('avatar', image)
    }
    fetch(`http://146.190.205.245/api/collections/users/records/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'multipart/form-data'
      },
      body: form
    }).then(res => res.json())
      .then((res) => {
        if (res.created) {
          Alert.alert("", "Profile Updated Successfully", [{
            text: 'Ok',
            onPress: () => { updateUser(); navigation.goBack() },
          }])
        } else {
          const keys = Object.keys(res.data)
          console.log(res.data)
          const err = res.data[keys[0]].message
          Alert.alert("", keys[0].charAt(0).toUpperCase() + keys[0].slice(1) + ": " + err)
        }
        setLoading(false);
      }).catch(err => { console.log("Fetch Error: ", err); setLoading(false) })
  }

  const deleteSocial = (index) => {
    const socialUpdated = social.slice(0, index).concat(social.slice(index + 1))
    setSocial(socialUpdated)
  }

  const handleSocial = (link, index) => {
    const socialUpdated = [...social]
    socialUpdated[index] = link
    setSocial(socialUpdated)
  }

  const handleImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });
    const assets = result.assets
    const file = {
      type: assets[0].type,
      name: assets[0].fileName,
      uri: assets[0].uri
    }
    setImage(file)

  }

  return (
    <View style={{ backgroundColor: '#031042', flex: 1, paddingTop: 10 }}>
      <View style={{ borderTopEndRadius: 40, borderTopStartRadius: 40, overflow: 'hidden', flex: 1 }}>
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View>
              <Image
                source={{
                  uri: image?.uri ? image.uri : user.avatar.length > 0 ? `http://146.190.205.245/api/files/_pb_users_auth_/${user.id}/${user.avatar}` : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={[styles.plus, { position: 'absolute', right: -20, bottom: 10 }]} onPress={() => handleImage()}>
                <Icon2 name="pencil" size={22} color={"white"} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.username}>{user.name}</Text>
            </View>
          </View>
          <View style={styles.body}>
            <Text style={styles.inputLabel}>NAME</Text>
            <View style={styles.shadow}>
              <TextInput style={styles.input} value={name} onChangeText={setName} />
              <Icon3 name='person' size={22} style={{ position: 'absolute', left: 10 }} />
            </View>
            <Text style={styles.inputLabel}>USERNAME</Text>
            <View style={styles.shadow}>
              <TextInput style={styles.input} value={username} onChangeText={setUsername} />
              <Icon3 name='person' size={22} style={{ position: 'absolute', left: 10 }} />
            </View>
            {user.isSeller && <Text style={styles.inputLabel}>SOCIAL LINKS</Text>}
            {user.isSeller && social.map((item, index) =>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} key={index}>
                <View style={[styles.shadow, { width: '83%', marginBottom: 10 }]}>
                  <TextInput
                    //placeholder="Social"
                    value={social[index]}
                    placeholderTextColor={"black"}
                    style={styles.input}
                    onChangeText={(t) => handleSocial(t, index)}
                  />
                </View>
                {index == 0 ? <TouchableOpacity style={styles.plus} onPress={() => setSocial([...social, ''])}>
                  <Icon name="plus" size={22} color={"white"} />
                </TouchableOpacity> : <TouchableOpacity style={styles.plus} onPress={() => deleteSocial(index)}>
                  <Icon name="minus" size={22} color={"white"} />
                </TouchableOpacity>}
              </View>)}
          </View>
          <TouchableOpacity onPress={handleSave}
            style={styles.button} >
            {loading ? (
              <ActivityIndicator size={18} color="white" />
            ) : (
              <Text style={styles.buttonText}>Save Changes</Text>)
            }
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>)
}

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  body: {
    paddingHorizontal: 25,
    paddingVertical: 20
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 10
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
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    //backgroundColor: '#C7F6B6',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  plus: {
    backgroundColor: '#031042',
    borderRadius: 11,
    width: 40, height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#031042',
    borderRadius: 25,
    paddingHorizontal: 60,
    paddingVertical: 15,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    right: 25,
    left: 25,
    bottom: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
