import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useRoute } from '@react-navigation/native';

type HomeScreenProps = {
  setUserName: (name: string) => void;
};

const Home: React.FC<HomeScreenProps> = ({ setUserName }) => {
  const route = useRoute();
  const { user } = route.params || {}; 
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null); // State to store the watchId for later clearing

  useEffect(() => {
    if (user) {
      setUserName(user.Name); 
    }

    // Request location permission and watch location
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          startWatchingLocation();
        }
      } else {
        startWatchingLocation();
      }
    };

    // Function to start watching location
    const startWatchingLocation = () => {
      const id = Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true, distanceFilter: 0, interval: 1000 } // Update every second
      );
      setWatchId(id);
    };

    requestLocationPermission();

    // Cleanup on component unmount
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId); // Clear the location watch
      }
    };
  }, [user]);

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
        <Text style={styles.errorText}>User data not found!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="#f5f5f5" />
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>User ID: {user['User ID']}</Text>
        <Text style={styles.detailText}>Name: {user['Name']}</Text>
        <Text style={styles.detailText}>Role Name: {user['roleName']}</Text>
        <Text style={styles.detailText}>Phone Number: {user['Phone Number']}</Text>
        <Text style={styles.detailText}>Address: {user['Address']}</Text>
        <Text style={styles.detailText}>Location: {user['locationName']}</Text>
        <Text style={styles.detailText}>Geo Location: {user['geoLocation']}</Text>
        {location && (
          <Text style={styles.detailText}>
            Current Location: {location.latitude}, {location.longitude}
          </Text>
        )}
        <Text style={styles.detailText}>Date Created: {user['Date Created']}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionHeader}>Role Name: {user['roleName']}</Text>
        <Text style={styles.sectionHeader}>Role Privileges:</Text>
        {user.rolePrivileges.length > 0 ? (
          user.rolePrivileges.map((privilege, index) => (
            <Text key={index} style={styles.privilegeText}>
              - {privilege}
            </Text>
          ))
        ) : (
          <Text style={styles.privilegeText}>- No privileges available</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#075eec',
    marginTop: 20,
    marginBottom: 10,
  },
  privilegeText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 2,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Home;
