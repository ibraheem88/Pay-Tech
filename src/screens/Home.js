import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

const Gigs = [
  {
    id: 1,
    name: 'Social Media Marketing',
    description:
      'Boost your online presence with targeted social media campaigns',
    image:
      'https://www.cdgi.com/wp-content/uploads/2020/06/Successful-Social-Management.jpg',
    facebook: '3K',
    instagram: '4K',
    twitter: '2K',
  },
  {
    id: 2,
    name: 'Email Marketing',
    description:
      'Engage your audience and drive conversions with effective email campaigns',
    image:
      'https://www.sender.net/wp-content/uploads/2022/02/Email-Campaigns-smaller.png',
    facebook: '3K',
    instagram: '4K',
    twitter: '2K',
  },
  {
    id: 3,
    name: 'Influencer Marketing',
    description:
      'Partner with influencers to reach a wider audience and boost your brand awareness',
    image:
      'https://www.x-cart.com/wp-content/uploads/2019/04/A-Beginner%E2%80%99s-Guide-to-Influencer-Marketing-1.jpg',
    facebook: '3K',
    instagram: '4K',
    twitter: '2K',
  },
  {
    id: 4,
    name: 'Content Marketing',
    description:
      'Create valuable content to attract and retain your target audience',
    image:
      'https://www.freelogoservices.com/blog/wp-content/uploads/content-marketing.jpg',
    facebook: '3K',
    instagram: '4K',
    twitter: '2K',
  },
  {
    id: 5,
    name: 'Search Engine Marketing',
    description:
      'Maximize your website traffic and generate more leads with targeted ads',
    image:
      'https://cdn.shopify.com/s/files/1/0070/7032/files/seo-marketing-what-is-it-how-does-it-work-small.jpg?v=1618324109',
    facebook: '3K',
    instagram: '4K',
    twitter: '2K',
  },
  {
    id: 6,
    name: 'Google Ads Marketing',
    description:
      'Optimize google ads and generate more leads with targeted ads',
    image:
      'https://lh3.googleusercontent.com/bUIaXNG8oY0rsBlDOQGULxdjre8cM-0pqShTqPh7ALdx6X5I3w-ZPdBPi7HFQOWFfg=w895-rwa',
    facebook: '3K',
    instagram: '4K',
    twitter: '2K',
  },
];

const GigCard = ({gig}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: gig.image}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{gig.name}</Text>
        <Text style={styles.description}>{gig.description}</Text>
        <View style={styles.social}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{
                uri: 'https://www.facebook.com/images/fb_icon_325x325.png',
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>{gig.facebook}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{
                uri: 'https://static.xx.fbcdn.net/assets/?revision=1329671031208790&name=desktop-instagram-gradient-logo&density=1',
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>{gig.instagram}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              resizeMode="contain"
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1245px-Twitter-logo.svg.png',
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>{gig.twitter}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Home = () => {
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Gigs}
        renderItem={({item}) => <GigCard gig={item} key={item.id} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
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
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
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
  },
});

export default Home;
