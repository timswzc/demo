import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Image, Input, Text } from 'react-native-elements';
import Wave from './components/Wave';
import { useAuth } from './contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const { signIn, signInGoogle } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={ styles.container }>
      <LinearGradient
        colors={ ['#F07878', '#F0C090'] }
        style={ styles.gradient }
      >
        <Image source={ require('../assets/HighResLogo.png') } style={ styles.logo }/>
        <Text style={ { color: 'white', fontSize: 36, marginVertical: height * 0.03 } }>Login</Text>
        <Input
          placeholder="Email address"
          onChangeText={ setEmail }
          value={ email }
          autoComplete={ false }
          autoCorrect={ false }
          leftIcon={ { type: 'material-community', name: 'email', color: '#B8B8B8', size: 26, paddingRight: 5 } }
          inputContainerStyle={ {
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0,
          } }
          containerStyle={ styles.inputContainer }
        />
        <Input
          placeholder="Password"
          secureTextEntry={ hidePassword }
          onChangeText={ setPassword }
          value={ password }
          autoComplete={ false }
          autoCorrect={ false }
          leftIcon={ { type: 'font-awesome', name: 'lock', color: '#B8B8B8', size: 26, paddingHorizontal: 6 } }
          rightIcon={
            <TouchableOpacity onPress={ () => {
              setHidePassword(!hidePassword);
            } }>
              <Text style={ { color: '#9078A8', fontWeight: '700', fontSize: 12 } }>Show</Text>
            </TouchableOpacity> }
          inputContainerStyle={ {
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0,
          } }
          containerStyle={ styles.inputContainer }
        />
        <Button
          title="Login"
          buttonStyle={ styles.loginButton }
          containerStyle={ {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: height * 0.024,
            marginBottom: height * 0.015,

          } }
          titleStyle={ { color: '#FFFFFF', fontSize: 18 } }
          onPress={ () => {
            signIn(email, password);
          }
          }
        />
        <TouchableOpacity>
          <Text style={ { color: '#9078A8', fontSize: 16 } }>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={ { flexDirection: 'column', alignItems: 'center' } }>
          <Wave customStyles={ styles.svgCurve }/>
          <View style={ {
            width: width,
            height: height * 0.30,
            backgroundColor: '#ffffff',
            flexDirection: 'column',
            alignItems: 'center'
          } }>
            <View style={ { flexDirection: 'row', alignItems: 'center' } }>
              <View style={ { flex: 1, height: 1, backgroundColor: '#B1B1B1', marginLeft: 15 } }/>
              <View>
                <Text style={ { textAlign: 'center', paddingHorizontal: 10, fontSize: 14 } }>Or connect with</Text>
              </View>
              <View style={ { flex: 1, height: 1, backgroundColor: '#B1B1B1', marginRight: 15 } }/>
            </View>
            <View style={ { flexDirection: 'column', alignItems: 'center' } }>
              <Button
                title="Continue with Facebook"
                icon={ {
                  type: 'material-community',
                  name: 'facebook',
                  color: '#FFFFFF',
                  size: 26,
                  paddingHorizontal: 6
                } }
                buttonStyle={ {
                  backgroundColor: '#4267B2',
                  borderRadius: 30,
                  width: width * 0.7,
                } }
                containerStyle={ {
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: height * 0.024,
                  marginBottom: height * 0.012,
                } }
                titleStyle={ { color: '#FFFFFF', fontSize: 18 } }
              />
              <Button
                title="Continue with Google"
                icon={ { type: 'material-community', name: 'google', color: '#FFFFFF', size: 26 } }
                buttonStyle={ {
                  backgroundColor: '#DE5246',
                  borderRadius: 30,
                  width: width * 0.7,
                } }
                containerStyle={ {
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: height * 0.012,
                  marginBottom: height * 0.024,
                } }
                titleStyle={ { color: '#FFFFFF', fontSize: 18 } }
                onPress={ () => {
                  signInGoogle();
                } }
              />
              <View style={ { flexDirection: 'row', } }>
                <Text>Don&#39;t have an account?</Text>
                <TouchableOpacity onPress={ () => navigation.navigate('SignUp') }>
                  <Text style={ { color: '#9078A8' } }> Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: height * 0.19,
  },
  gradient: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    width: width * 0.7,
    height: height * 0.05,
    alignItems: 'center',
    marginVertical: height * 0.012,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#D1D1D1',
    backgroundColor: '#FFFFFF',
  },
  loginButton: {
    width: width * 0.7,
    backgroundColor: '#9078A8',
    borderRadius: 30,
  },
  svgCurve: {
    width: width * 1.3,
    height: '23%',
  }
});
