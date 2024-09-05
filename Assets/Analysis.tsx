import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';

const Analysis: React.FC = () => {
  // Use user data from context or props if needed
  // Assuming user data is available
  const user = {
    employeeInOut: [
      // Replace with actual data from the backend
    ],
    managerInOut: [
      // Replace with actual data from the backend
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="#f5f5f5" />
      <ScrollView>
        {/* Display Employee In/Out Records */}
        <Text style={styles.sectionHeader}>Employee In/Out Records:</Text>
        {user.employeeInOut.map((record, index) => (
          <Text key={index} style={styles.detailText}>
            Check In: {record['Check In']} | Check Out: {record['Check Out']} | Total Time: {record['Total Time']}
          </Text>
        ))}

        {/* Display Manager In/Out Records */}
        <Text style={styles.sectionHeader}>Manager In/Out Records:</Text>
        {user.managerInOut.map((record, index) => (
          <Text key={index} style={styles.detailText}>
            User ID: {record['User ID']} | Check In: {record['Check In']} | Check Out: {record['Check Out']} | Total Time: {record['Total Time']}
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

export default Analysis;
