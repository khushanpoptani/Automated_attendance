import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';

const Request: React.FC = () => {
  // Use user data from context or props if needed
  // Assuming user data is available
  const user = {
    sentRequests: [
      // Replace with actual data from the backend
    ],
    receivedRequests: [
      // Replace with actual data from the backend
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="#f5f5f5" />
      <ScrollView>
        {/* Display Sent Requests */}
        <Text style={styles.sectionHeader}>Sent Requests:</Text>
        {user.sentRequests.map((request, index) => (
          <Text key={index} style={styles.detailText}>
            Request ID: {request['Request ID']} | Check In: {request['Check In']} | Check Out: {request['Check Out']} | Total Time: {request['Total Time']}
          </Text>
        ))}

        {/* Display Received Requests */}
        <Text style={styles.sectionHeader}>Received Requests:</Text>
        {user.receivedRequests.map((request, index) => (
          <Text key={index} style={styles.detailText}>
            Request ID: {request['Request ID']} | User ID: {request['user ID']} | Check In: {request['Check In']} | Check Out: {request['Check Out']} | Total Time: {request['Total Time']}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#075eec',
    marginTop: 15,
    marginBottom: 8,
  },
});

export default Request;
