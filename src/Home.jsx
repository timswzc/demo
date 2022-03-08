import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './contexts/AuthContext';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const { signOutMain } = useAuth();
  const navigation = useNavigation();
  return (
    <View style={ styles.container }>
      <Text>Welcome!</Text>
      <Button
        title="Log Volunteer Hours"
        titleStyle={ {
          fontSize: 18, color: '#FFFFFF'
        } }
        buttonStyle={ styles.logoutButton }
        containerStyle={ {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: height * 0.024,
          marginBottom: height * 0.015,

        } }
        onPress={ () => {
          navigation.navigate('Log Volunteer Hours');
        }
        }
      />
      <Button
        title="Log Out"
        titleStyle={ {
          fontSize: 18, color: '#FFFFFF'
        } }
        buttonStyle={ styles.logoutButton }
        containerStyle={ {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: height * 0.024,
          marginBottom: height * 0.015,

        } }
        onPress={ () => {
          signOutMain();
        }
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    width: width * 0.7,
    backgroundColor: '#9078A8',
    borderRadius: 30,
  },
});
