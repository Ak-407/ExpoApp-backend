import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Linking } from 'react-native';

const JobDetails = ({ route, navigation }) => {
  const { jobLink } = route.params;
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:5000/job-details?job_link=${encodeURIComponent(jobLink)}`);
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobLink]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!jobDetails) {
    return <Text>Job details not found.</Text>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{jobDetails.title}</Text>
      <Text style={styles.location}>Location: {jobDetails.location}</Text>
      <Text style={styles.description}>Description: {jobDetails.description}</Text>
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => Linking.openURL(jobDetails.apply_url)}
      >
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
      <Text style={styles.qualificationsTitle}>Qualifications:</Text>
      {jobDetails.qualifications.map((qual, index) => (
        <Text key={index} style={styles.qualification}>{qual}</Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    textDecorationLine:'underline'

  },
  location: {
    fontSize: 18,
    marginBottom: 18,
  },
  description: {
    fontSize: 16,
    marginBottom: 45,
    fontWeight:'500'
  },
  qualificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  qualification: {
    fontSize: 16,
    marginBottom: 4,
  },
  applyButton: {
    marginTop: 16,
    backgroundColor: '#04AA6D',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'center',
    width:300,
    marginBottom: 40
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default JobDetails;
