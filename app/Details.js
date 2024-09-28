import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Details = ({ route }) => {
  const { link } = route.params;
  const [newsDetails, setNewsDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:5000/news-details1?news_link1=${encodeURIComponent(link)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNewsDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news details:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNewsDetails();
  }, [link]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#04AA6D" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load news details: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{newsDetails.title}</Text>
      <Text style={styles.description}>{newsDetails.description}</Text>
      <Text style={styles.tag}>{newsDetails.tag}</Text>
      <Text style={styles.link}>{newsDetails.url}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  tag: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 10,
  },
  link: {
    fontSize: 12,
    color: '#aaa',
  },
  errorText: {
    color: 'red',
  },
});

export default Details;
