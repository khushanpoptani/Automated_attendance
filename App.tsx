import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

// Import screens
import Home from './Assets/Home';
import Request from './Assets/Request'; 
import Analysis from './Assets/Analysis'; 
import Settings from './Assets/Settings'; 
import Login from './Assets/Login';

// Import local images
const icons = {
  home: require('./Assets/Images/home.png'),
  request: require('./Assets/Images/request.png'),
  analysis: require('./Assets/Images/analysis.png'),
  settings: require('./Assets/Images/settings.png'),
};

// Define Stack and Tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [userName, setUserName] = useState('User'); 

  const CustomHeader = () => (
    <SafeAreaView style={{ backgroundColor: '#f5f5f5' }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerLeft}>
          <Image
            source={require('./Assets/Images/profile.png')}
            style={styles.profileIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Welcome, {userName}!</Text>

        <View style={styles.headerRight}>
          <View style={styles.inOrOutCircle} />
        </View>
      </View>
    </SafeAreaView>
  );

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let imageSource;
            switch (route.name) {
              case 'Home':
                imageSource = icons.home;
                break;
              case 'Request':
                imageSource = icons.request;
                break;
              case 'Analysis':
                imageSource = icons.analysis;
                break;
              case 'Settings':
                imageSource = icons.settings;
                break;
              default:
                imageSource = icons.home;
                break;
            }
            return (
              <Image
                source={imageSource}
                style={{ width: size, height: size, tintColor: color }}
                resizeMode="contain"
              />
            );
          },
          tabBarActiveTintColor: '#8B0000',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#F5F5F5' },
          header: () => <CustomHeader />,
        })}
      >
        <Tab.Screen name="Home">
          {() => <Home setUserName={setUserName} />}
        </Tab.Screen>
        <Tab.Screen name="Request" component={Request} />
        <Tab.Screen name="Analysis" component={Analysis} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    marginTop: 10,
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
  inOrOutCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ff0000',
    shadowColor: '#ff0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    flex: 3,
    fontSize: 18,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
});

export default App;
