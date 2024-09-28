import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchJobs(page, searchQuery);
  }, [page, searchQuery]);

  const fetchJobs = async (pageNumber = 1, query = '') => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/scrape?page=${pageNumber}&q=${query}`);
      const data = await response.json();
      if (pageNumber === 1) {
        setJobs(data);
      } else {
        setJobs(prevJobs => [...prevJobs, ...data]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderItem = ({ item }) => (
    <View style={styles.jobContainer}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobPlace}>Place: {item.place}</Text>
      <Text style={styles.jobQualifications}>Qualifications:</Text>
      <FlatList
        data={item.qualifications}
        keyExtractor={(qual, index) => index.toString()}
        renderItem={({ item: qual }) => <Text style={styles.jobQualification}>{qual}</Text>}
      />
      <TouchableOpacity
        style={styles.learnMoreButton}
        onPress={() => navigation.navigate('JobDetails', { jobLink: item.link })}
      >
        <Text style={styles.learnMoreButtonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Listings</Text>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for jobs"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        </View>
      <FlatList
        data={jobs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>No jobs found.</Text>}
      />
      <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore} disabled={jobs.length === 0}>
        <Text style={styles.loadMoreButtonText}>Load More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchForm: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginRight: 8,
    borderRadius: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  jobContainer: {
    padding: 16,
    marginBottom: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobPlace: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  jobQualifications: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  jobQualification: {
    fontSize: 14,
    color: '#333',
  },
  learnMoreButton: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#04AA6D',
    borderRadius: 20,
  },
  learnMoreButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 16,
  },
  loadMoreButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default JobSearch;
