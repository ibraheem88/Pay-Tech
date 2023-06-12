import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'

const GigCard = ({ gig, navigation }) => {

  const [user, setUser] = useState({})

  const getUser = () => {
    fetch(`http://146.190.205.245/api/collections/users/records/${gig.seller_id}`, {
      method: "GET"
    }).then(res => res.json())
      .then((res) => {
        setUser(res)
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Detail', { gig: gig })}>
      <Image source={{ uri: user?.avatar?.length > 0 ? `http://146.190.205.245/api/files/_pb_users_auth_/${user.id}/${user.avatar}` : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" }} style={styles.image} />
      <View style={styles.details}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Icon name="star" size={16} color={"#FFA500"} />
          <Text style={{ marginLeft: 5, fontWeight: 'bold', color: '#FFA500' }}>{gig.rating.length > 1 ? gig.rating : "0.0"}</Text>
          <Text style={{ marginLeft: 10 }}>({gig.reviews.length})</Text>
        </View>
        <Text style={styles.name}>{user.name} | {gig.name} |</Text>
        <Text style={styles.description} numberOfLines={2}>{gig.description}</Text>
        <View style={styles.social}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{
                uri: 'https://www.facebook.com/images/fb_icon_325x325.png',
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>1K</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{
                uri: 'https://static.xx.fbcdn.net/assets/?revision=1329671031208790&name=desktop-instagram-gradient-logo&density=1',
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>2K</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              resizeMode="contain"
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2KxlMK7ZjMnKydbAbX9Tk2JHIESpR-Rx_4g&usqp=CAU',
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>2K</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, alignSelf: 'flex-end', marginRight: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Icon3 name='currency-rupee' size={22} color={"#FFA500"} />
          <Text style={{ fontSize: 15, color: 'black', fontWeight: 'bold', marginLeft: 5 }}>{gig.rate} PKR</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CategoryCard = ({ item, selected, setSelected }) => {

  const handleSelected = () => {
    let index = selected.indexOf(item.name)
    if (selected.includes(item.name)) {
      const newSelected = selected.slice(0, index).concat(selected.slice(index + 1, selected.length))
      setSelected(newSelected)
    } else {
      setSelected([...selected, item.name])
    }
  }

  return (
    <TouchableOpacity style={[styles.shadow, { alignItems: 'center', borderRadius: 10, overflow: 'hidden', marginBottom: 0, marginTop: 5, marginHorizontal: 0, backgroundColor: '#ADD8E6' }, selected.includes(item.name) && { borderColor: 'green', borderWidth: 2 }]}
      onPress={() => handleSelected()}>
      <Text style={{ color: 'black', paddingVertical: 10, fontWeight: '500', fontSize: 15 }}>{item.name}</Text>
      <Image source={{ uri: item.image }} style={{ width: 150, height: 100, resizeMode: 'cover' }} />
    </TouchableOpacity>
  )
}

const Home = ({ navigation }) => {
  const [gigs, setGigs] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selected, setSelected] = useState([])
  const categories = [{ name: 'Food', image: 'https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000' },
  { name: 'Garments', image: 'https://i.cbc.ca/1.4884412.1540928065!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/wardrobe-maitanence.jpg' },
  { name: 'Shoes', image: 'https://hips.hearstapps.com/hmg-prod/images/cushioned-shoes-15408-1632754154.jpg' },
  { name: 'Tech', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17HpzxoABAw9Ybe_pfaPImJIg7FfKveVR9g&usqp=CAU' },
  { name: 'Sports', image: 'https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2020/02/10105218/Sports-1024x622.jpg' },
  { name: 'Real Estate', image: 'https://blog.hubspot.com/hubfs/Sales_Blog/real-estate-business-compressor.jpg' },
  { name: 'Appliances', image: 'https://cdn.firstcry.com/education/2023/01/13101355/Names-Of-Household-Appliances-In-English.jpg' }]

  const getGigs = async (text) => {
    //setLoading(true);
    fetch(`http://146.190.205.245/api/collections/gigs/records?page=1&perPage=50&filter=(name~'${text}' || description~'${text}')`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        setGigs([...res.items])
      }).catch(err => console.log("Fetch Error: ", err))
  }

  useEffect(() => {
    if (searchText.length > 2) {
      getGigs(searchText)
    }
  }, [searchText])

  useEffect(() => {
    if (selected.length == 0) {
      getGigs('');
      return
    }
    const newGigs = gigs.filter((item) => selected.includes(item.category))
    setGigs(newGigs)
  }, [selected])

  useEffect(() => {
    getGigs('')
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ borderTopEndRadius: 40, borderTopStartRadius: 40, overflow: 'hidden', flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
        <View style={styles.shadow}>
          <TextInput style={{
            backgroundColor: 'transparent',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 15,
            color: 'black',
          }}
            value={searchText} onChangeText={(t) => setSearchText(t)} onBlur={() => { setSearchText(''); getGigs('') }}
            placeholder='Search Services' />
          <Icon name='search1' color="#031042" size={24} style={{ position: 'absolute', right: 10, top: 17 }} />
        </View>
        <FlatList
          ListHeaderComponent={
            <FlatList
              horizontal={true}
              style={{ marginVertical: 10 }}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
              data={categories}
              ItemSeparatorComponent={<View style={{ width: 15 }} />}
              renderItem={({ item, index }) =>
                <CategoryCard item={item} key={item.name} selected={selected} setSelected={setSelected} index={index} />}
            />
          }
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          data={gigs}
          renderItem={({ item }) => <View style={styles.shadow}><GigCard gig={item} key={item.id} navigation={navigation} /></View>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#031042', flex: 1, paddingTop: 10
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 8
  },
  shadow: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 15,
    marginTop: 15,
    //width: '100%',
    marginBottom: 15,
    elevation: 12,
    shadowColor: 'black',
  },
  image: {
    width: 100,
    height: '100%',
    flex: 0.7,
    resizeMode: 'cover'
  },
  details: {
    flex: 1,
    padding: 16
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
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialText: {
    fontSize: 14,
    color: 'black',
  },
});

export default Home;
