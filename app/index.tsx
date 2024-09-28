import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import JobSearch from './JobSearch';
import PostJob from './PostJob';
import JobDetails from './JobDetails';
import Details from './Details'; 
import FillJob from './filljob';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="JobSearch" component={JobSearch} options={{ title: 'Job Search' }} />
        <Stack.Screen name="JobDetails" component={JobDetails} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="PostJob" component={PostJob} options={{ title: 'Post a Job' }} />
        <Stack.Screen name="FillJob" component={FillJob} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
