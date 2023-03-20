import {StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Settings from './src/screens/Settings';
import ProfileScreen from './src/screens/Profile';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={AppDrawer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

function CustomDrawerContent(props) {
  console.log(props);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          props.navigation.pop();
        }}
      />
    </DrawerContentScrollView>
  );
}

const AppDrawer = () => (
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
    <Drawer.Screen
      name="Home Drawer"
      component={Home}
      options={{
        title: 'Home',
        headerStyle: {backgroundColor: '#a3386c'},
      }}
    />
    <Drawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profile',
        headerStyle: {backgroundColor: '#a3386c'},
      }}
    />
    <Drawer.Screen
      name="Settings"
      component={Settings}
      options={{
        title: 'Settings',
        headerStyle: {backgroundColor: '#a3386c'},
      }}
    />
    {/* <Drawer.Screen name="Verified Orders" component={VerifiedOrders} /> */}
  </Drawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <HomeStack />
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
