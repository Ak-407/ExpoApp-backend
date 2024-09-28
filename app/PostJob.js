import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostJob = () => {
  const [jobs, setJobs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/jobs');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      Alert.alert('Error', `An error occurred while fetching jobs: ${error.message}`);
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.jobsTitle}>Jobs</Text>
          <Text style={styles.jobsDescription}>Find a job you love.</Text>
        </View>
        <TouchableOpacity
          style={styles.postJobButton}
          onPress={() => navigation.navigate('FillJob')}
        >
          <Text style={styles.postJobButtonText}>Post A New Job</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.jobsCards}>
        {jobs.map((job, index) => (
          <View key={index} style={styles.job}>
            <Text style={styles.jobCategory}>Category: {job.job_type}</Text>
            <Text style={styles.jobTitle}>Title: {job.title}</Text>
            <View style={styles.jobDetails}>
              <Text>Location: {job.location}</Text>
              <Text>Type: {job.type}</Text>
            </View>
            <Text>Experience: {job.experience}</Text>
            <Text>Salary: {job.salary}</Text>
            <Text>Eligibility: {job.eligibility}</Text>
            <Text>Industry Type: {job.industry_type}</Text>
            <Text>Functional Area: {job.functional_area}</Text>
            <Text>Skills: {job.skills}</Text>
            <View style={styles.jobSource}>
              <Image source={{ uri: job.source_image }} style={styles.jobImage} />
              <Text>
                <Text style={styles.jobSourceName}>{job.source_name}</Text>, {job.source_time}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eceff1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  jobsTitle: {
    fontSize: 30,
    color: '#000051',
  },
  jobsDescription: {
    fontSize: 16,
    color: '#616161',
  },
  postJobButton: {
    backgroundColor: '#5e35b1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  postJobButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  jobsCards: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  job: {
    width: '100%',
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  jobCategory: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#311b92',
  },
  jobTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  jobSource: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobImage: {
    width: 54,
    height: 54,
    borderRadius: 8,
    marginRight: 8,
  },
  jobSourceName: {
    fontWeight: 'bold',
    color: '#000051',
  },
});

export default PostJob;
