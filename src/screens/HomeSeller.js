import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get("window").width;

const HomeSeller = () => {
  const { user } = useSelector(state => state.user);
  console.log(user)

  const chartConfig = {
    //backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    //backgroundGradientTo: "white",
    backgroundGradientToOpacity: 0,
    fillShadowGradientFromOpacity: 0,
    fillShadowGradientToOpacity: 0,
    color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [0, 0, 0, 0, 10, 0],
        color: (opacity = 1) => `#031042`, // optional
        strokeWidth: 1 // optional
      }
    ],
    legend: ["Earnings"] // optional
  };

  const sellerData = {
    name: user.name,
    rating: '4.5',
    level: 'Level 2',
    earnings: '$1000',
    ordersSold: '250',
    views: '5,000',
    responseRate: '98%',
    responseTime: '2 hours',
    cancellations: '5%',
    disputes: '1%',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
      {/* <Text style={styles.title}>Seller Dashboard</Text> */}
      <View style={styles.sellerInfo}>
        <Image style={styles.sellerImage}
          source={{ uri: user.avatar?.length > 1 ? `http://146.190.205.245/api/files/_pb_users_auth_/${user.id}/${user.avatar}` : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" }} />
        <View style={styles.sellerText}>
          <Text style={styles.sellerName}>{sellerData.name}</Text>
          <Text style={styles.sellerRating}>{sellerData.rating} ({sellerData.level})</Text>
        </View>
      </View>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={{ alignSelf: 'center', marginBottom: 10 }}
        withInnerLines={false}
        withOuterLines={false}
      />
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{sellerData.earnings}</Text>
          <Text style={styles.statLabel}>Earnings</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{sellerData.ordersSold}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{sellerData.views}</Text>
          <Text style={styles.statLabel}>Views</Text>
        </View>
      </View>
      <View style={styles.additionalStats}>
        <View style={styles.additionalStat}>
          <Text style={styles.additionalStatLabel}>Response Rate</Text>
          <Text style={styles.additionalStatValue}>{sellerData.responseRate}</Text>
        </View>
        <View style={styles.additionalStat}>
          <Text style={styles.additionalStatLabel}>Response Time</Text>
          <Text style={styles.additionalStatValue}>{sellerData.responseTime}</Text>
        </View>
        <View style={styles.additionalStat}>
          <Text style={styles.additionalStatLabel}>Cancellations</Text>
          <Text style={styles.additionalStatValue}>{sellerData.cancellations}</Text>
        </View>
        <View style={styles.additionalStat}>
          <Text style={styles.additionalStatLabel}>Disputes</Text>
          <Text style={styles.additionalStatValue}>{sellerData.disputes}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeSeller

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  sellerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  sellerImageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
  sellerText: {},
  sellerName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sellerRating: {
    fontSize: 16,
    color: '#999',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  stat: {
    width: '30%',
    borderColor: 'lightgrey',
    backgroundColor: '#031042',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 20,
    // fontWeight: 'bold',
    padding: 2,
    borderRadius: 4,
    color: 'white',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 16,
    padding: 4,
    backgroundColor: '#F5F5F4',
    width: '80%',
    textAlign: 'center',
    borderRadius: 6,
    fontWeight: 'bold',
    color: 'black',
  },
  additionalStats: {
    backgroundColor: '#031042',
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  additionalStatValue: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
    marginBottom: 10,
  },
  additionalStat: {
    backgroundColor: '#F5F5F4',
    borderRadius: 4,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 10,
  },
  additionalOptionsIcon: {
    marginRight: 10,
  },
  additionalStatLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10
  },
});
