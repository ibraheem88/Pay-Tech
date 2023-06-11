import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image, RefreshControl, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux';
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

const PostCard = ({ id, handleDelete, seller }) => {
  const [post, setPost] = useState({})

  const getPostDetail = async () => {
    fetch(`http://146.190.205.245/api/collections/posts/records/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        //console.log(res)
        setPost(res)
      }).catch(err => console.log("Fetch Error: ", err))
  }

  useEffect(() => {
    getPostDetail()
  })

  return (
    <View style={{
      backgroundColor: 'white', borderRadius: 4, marginBottom: 30, elevation: 12,
      shadowColor: 'black', width: '100%',
    }}>
      <View style={{
        elevation: 6,
        shadowColor: 'black',
      }}>
        <Image source={{ uri: `http://146.190.205.245/api/files/${post?.collectionId}/${post.id}/` + post.post_image }}
          style={{ width: '100%', height: 300, borderRadius: 8, opacity: 0.8, borderTopRightRadius: 120 }} />
        {!seller && <Icon name='trash-alt' size={24} color='red' style={{ position: 'absolute', right: 10, top: 10 }}
          onPress={() => handleDelete(id)} />}
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ color: 'black', marginBottom: 10 }}>{post.post_text}</Text>
        {post.post_url?.length > 0 && <TouchableOpacity onPress={() => Linking.openURL(post.post_url)
        } style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon2 name='web' size={22} style={{}} />
          <Text style={{ color: 'blue', marginLeft: 10, fontWeight: 'bold' }}>{post.post_url}</Text>
        </TouchableOpacity>}
        {post.address?.length > 0 && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon3 name='location-pin' size={22} />
          <Text style={{ color: 'black', marginLeft: 10, fontWeight: 'bold' }}>{post.address}</Text>
        </View>}
        {/* <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{ width: '100%', height: 100 }}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView> */}
        <Text style={{ color: 'black', marginTop: 10, fontWeight: 'bold' }}>Traffic Hit: {post.post_hit}</Text>
      </View>
    </View>
  )
}

const OrderDetail = ({ route, navigation }) => {
  const { user } = useSelector(state => state.user)
  const [order, setOrder] = useState(route.params.order)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleOrder = () => {
    fetch(`http://146.190.205.245/api/collections/orders/records/${order.id}`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(res => res.json())
      .then(res => {
        //console.log(res)
        setOrder(res)
        setIsRefreshing(false)
      }).catch(err => { console.log("Fetch Error: ", err); setIsRefreshing(false) })

  }

  const deletePost = async (id) => {
    fetch(`http://146.190.205.245/api/collections/posts/records/${id}`, {
      method: "DELETE"
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        console.log("Post Deleted")
      }).catch(err => console.log("Fetch Error: ", err))
  }

  useEffect(() => {
    handleOrder()
  }, [])

  const handleDelete = (id) => {
    const newPosts = order.posts.filter(item => item !== id)
    fetch(`http://146.190.205.245/api/collections/orders/records/${order.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        posts: newPosts
      })
    }).then(res => res.json())
      .then(res => {
        deletePost(id)
        setOrder(res)
      }).catch(err => { console.log("Fetch Error: ", err) })
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    handleOrder()
  }


  return (
    <View style={styles.container}>
      <View style={{ borderTopEndRadius: 40, borderTopStartRadius: 40, overflow: 'hidden', flex: 1, paddingTop: 20, backgroundColor: 'white' }}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ListHeaderComponent={<>
            <Text style={[{ fontSize: 15, fontWeight: 'bold' }, user.isSeller && { marginBottom: 20 }]}>Add posts related to your business so social media influencers can post them.</Text>
            {!user.isSeller && <TouchableOpacity
              onPress={() => { navigation.navigate('Add Post', { orderId: order.id, posts: order.posts }) }}
              style={styles.button} >
              <Text style={styles.buttonText}>Add Posts</Text>
            </TouchableOpacity>}</>}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={["green"]} // for android
              tintColor={"green"} // for ios
            />
          }
          data={order.posts}
          renderItem={({ item }) => (
            <PostCard id={item} handleDelete={handleDelete} seller={user.isSeller} />
          )}
          ListFooterComponent={<View style={{ height: 20 }} />}
        />
      </View>
    </View>
  );
}

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#031042', flex: 1, paddingTop: 10
  },
  button: {
    backgroundColor: '#031042',
    borderRadius: 25,
    alignSelf: 'center',
    paddingHorizontal: 60,
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
