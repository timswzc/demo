import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Text } from 'react-native-elements';
import { View } from 'react-native';
import Login from './Login';
import SignUp from './SignUp';
import DemographicForm from './DemographicForm';
import HomeWrapper from './HomeWrapper';
import TeamWrapper from './TeamWrapper';
import { useAuth } from './contexts/AuthContext';

const authStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const Router = () => {
  const { user } = useAuth();

  const AuthScreens = () => {
    return (
      <authStack.Navigator>
        <authStack.Screen name="Login" component={ Login } options={ { headerShown: false } }/>
        <authStack.Screen name="SignUp" component={ SignUp } options={ { headerShown: false } }/>
        <authStack.Screen name="DemographicForm" component={ DemographicForm } options={ { headerShown: false } }/>
      </authStack.Navigator>
    );
  };

  function Profile() {
    return (
      <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
        <Text>Profile!</Text>
      </View>
    );
  }

  const AppScreens = () => {
    return (
      <Tab.Navigator
        screenOptions={ ({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home-sharp' : 'home-outline';
            } else if (route.name === 'Team') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={ iconName } color="#000" type="ionicon"/>;
          }
        }) }>
        <Tab.Screen name="Home" component={ HomeWrapper } options={ { headerShown: false } }/>
        <Tab.Screen name="Team" component={ TeamWrapper } options={ { headerShown: false } }/>
        <Tab.Screen name="Profile" component={ Profile }/>
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      { user ? <AppScreens/> : <AuthScreens/> }
    </NavigationContainer>
  );
};

