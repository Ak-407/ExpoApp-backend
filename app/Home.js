import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import logo from '../assets/logo.png'; // Adjust the path if necessary
import LoadingIndicator from './LoadingIndicator'; 
const getBaseDomain = (url) => {
  try {
    const { hostname } = new URL(url);
    const parts = hostname.split('.');
    return parts.slice(-2).join('.');
  } catch (error) {
    return 'No source available';
  }
};


const Home = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [articles, setArticles] = useState([]);
  const [additionalArticles2, setAdditionalArticles2] = useState([]);
  const [additionalArticles3, setAdditionalArticles3] = useState([]);
  const [additionalArticles4, setAdditionalArticles4] = useState([]);
  const [additionalArticles5, setAdditionalArticles5] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); // Start loading indicator
  
      try {
        const response = await fetch('http://10.0.2.2:5000/api/news');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNews(data.news || []);
        setArticles(data.articles_from_jkalerts || []);
        setAdditionalArticles2(data.articles_data2 || []);
        setAdditionalArticles3(data.articles_data3 || []);
        setAdditionalArticles4(data.articles_data4 || []);
        setAdditionalArticles5(data.articles_data5 || []);
      } catch (error) {
        console.error('Error fetching news:', error.message);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
  
    fetchNews();
  }, []);
  

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load news: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    {loading ? (
      <LoadingIndicator />
    ) : (
      <View style={styles.navbar}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.navbarTitle}>JK News</Text>
      </View>
      )}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.titlesecond}>Jobs News</Text>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.cardList}
        >
        {loading ? (
          <ActivityIndicator size="large" color="#04AA6D" />
        ) : (
            news.map((item, index) => (
              <View key={index} style={styles.card}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <View style={styles.content}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>
                    {item.desc ? (item.desc.length > 40 ? `${item.desc.substring(0, 40)}...` : item.desc) : (item.content ? (item.content.length > 40 ? `${item.content.substring(0, 40)}...` : item.content) : 'No description available')}
                  </Text>
                  <Text style={styles.link}>
                    Source: {item.link ? getBaseDomain(item.link) : 'No source available'}
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Details', { link: item.link })}>
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Learn More</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))
            
          )}
          {loading ? (
            <ActivityIndicator size="large" color="#04AA6D" />
          ) : (
            articles.map((item, index) => (
              <View key={index} style={styles.card}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <View style={styles.content}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>
                    {item.desc ? (item.desc.length > 40 ? `${item.desc.substring(0, 40)}...` : item.desc) : (item.content ? (item.content.length > 40 ? `${item.content.substring(0, 40)}...` : item.content) : 'No description available')}
                  </Text>
                  <Text style={styles.link}>
                    Source: {item.link ? getBaseDomain(item.link) : 'No source available'}
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Details', { link: item.link })}>
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Learn More</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))
            
          )}
        </ScrollView>

        <Text style={styles.titlesecond}>Additional News</Text>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.cardList}
        >
        {loading ? (
          <ActivityIndicator size="large" color="#04AA6D" />
        ) : (
            additionalArticles2.map((item, index) => (
              <View key={index} style={styles.card}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <View style={styles.content}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>
                    {item.content ? (item.content.length > 40 ? `${item.content.substring(0, 40)}...` : item.content) : 'No description available'}
                  </Text>
                  <Text style={styles.link}>
                    Source: {item.read_more_url ? getBaseDomain(item.read_more_url) : 'No source available'}
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Details', { link: item.read_more_url })}>
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Learn More</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        <Text style={styles.titlesecond}>Notifications</Text>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.cardListnew}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#04AA6D" />
          ) : (
            additionalArticles4.map((item, index) => (
              <View key={index} style={styles.cardnew}>
                <View style={styles.content}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <Text style={styles.description}>
                  Source: {item.link ? getBaseDomain(item.link) : 'No source available'}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
        
        <Text style={styles.titlesecond}>Job Updates</Text>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.cardList}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#04AA6D" />
          ) : (
            additionalArticles5.map((item, index) => (
              <View key={index} style={styles.cardnewsecond}>
                <View style={styles.content}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <Text style={styles.description}>
                  Source: {item.link ? getBaseDomain(item.link) : 'No source available'}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <Text style={styles.titlesecond}>GOVT. Jobs</Text>
        <ScrollView 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.cardList}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#04AA6D" />
          ) : (
            additionalArticles3.map((item, index) => (
              <View key={index} style={styles.cardgovt}>
                <View style={styles.content}>
                  <Text style={styles.title}>{item.organization}</Text>
                  <Text style={styles.description}>
                    Source: {item.link ? getBaseDomain(item.link) : 'No source available'}
                  </Text>
                  <Text style={styles.descriptionimp}>
                    Posts: {item.posts}
                  </Text>
                  <Text style={styles.description}>
                    Qualification: {item.qualification}
                  </Text>
                  <Text style={styles.description}>
                    Post Date: {item.post_date}
                    {"\n"}
                    Last Date: {item.last_date}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
        <Text style={styles.amaan}>Made with ❤️ By Amaan</Text>
      </ScrollView>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('JobSearch')}>
          <Text style={styles.navButtonText}>Job Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('PostJob')}>
          <Text style={styles.navButtonText}>Post a Job</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  amaan: {
    display:'flex',
    textAlign:'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 0,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 0,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 100,
    height: 80,
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 13,
    flexGrow: 1,
  },
  cardList: {
    paddingHorizontal: 6,
  },
  cardListnew: {
    paddingHorizontal: 6,
  },
  card: {
    width: 350, // Adjust width as needed
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flex: 1,
    alignItems: 'flex-start', // Ensure items align properly
    marginBottom: 20, // Ensure there's space below each card
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cardnew: {
    width: 250, // Adjust width as needed
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flex: 1,
    alignItems: 'flex-start', // Ensure items align properly
    marginBottom: 20, // Ensure there's space below each card
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cardnewsecond: {
    width: 210, // Adjust width as needed
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flex: 1,
    alignItems: 'center', // Ensure items align properly
    marginBottom: 20, // Ensure there's space below each card
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cardgovt: {
    padding: 20,
    width: 350, // Adjust width as needed
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flex: 1,
    alignItems: 'flex-start', // Ensure items align properly
    marginBottom: 20, // Ensure there's space below each card
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 150, // Adjust based on aspect ratio
  },
  content: {
    padding: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align content to the top
    textAlign: 'left'
  },
  titlefirst: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
  },
  titlesecond: {
    fontSize: 23,
    fontWeight: '900',
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 10,
    textDecorationLine: 'underline'
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  descriptionimp: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 30,
    marginTop: 20
  },
  link: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#04AA6D',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 300
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#04AA6D',
    paddingVertical: 10,

  },
  navButton: {
    flex: 1,
    alignItems: 'center',

  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
