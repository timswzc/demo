import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import LogHours from './LogHours';

function HomeWrapper() {

  const HomeStack = createStackNavigator();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Welcome" component={ Home }/>
      <HomeStack.Screen name="Log Volunteer Hours" component={ LogHours }/>
    </HomeStack.Navigator>
  );
}

export default HomeWrapper;
