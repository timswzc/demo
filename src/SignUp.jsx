import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { validate } from 'validate.js';
import { signInConstraints } from './constraints';
import Wave from './components/Wave';
import { createAlert } from './Utility';
import { useAuth } from './contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function SignUp() {
  const { signUp } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={ styles.container }>
      <LinearGradient
        colors={ ['#F07878', '#F0C090'] }
        style={ styles.gradient }
      >
        <Text style={ { color: 'white', fontSize: 36, marginTop: height * 0.12 } }>Sign Up</Text>
        <Wave customStyles={ styles.svgCurve }/>
        <View style={ { flex: 1, backgroundColor: '#ffffff', flexDirection: 'column', alignItems: 'center' } }>
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
            placeholder="Confirm email address"
            onChangeText={ setConfirmEmail }
            value={ confirmEmail }
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
          <Input
            placeholder="Confirm password"
            secureTextEntry={ true }
            onChangeText={ setConfirmPassword }
            value={ confirmPassword }
            autoComplete={ false }
            autoCorrect={ false }
            leftIcon={ { type: 'font-awesome', name: 'lock', color: '#B8B8B8', size: 26, paddingHorizontal: 6 } }
            inputContainerStyle={ {
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 0,
            } }
            containerStyle={ styles.inputContainer }
          />
          <Button
            title="Signup"
            buttonStyle={ styles.loginButton }
            containerStyle={ {
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: height * 0.030,
            } }
            titleStyle={ { color: '#FFFFFF', fontSize: 18 } }
            onPress={ () => {
              let error = validate({ from: email }, signInConstraints);
              if (error) {
                createAlert('Error', error.from[0]);
                return;
              }
              error = validate({ email: email, confirmEmail: confirmEmail }, signInConstraints);
              if (error) {
                createAlert('Error', error.confirmEmail[0]);
                return;
              }
              error = validate({ password: password, confirmPassword: confirmPassword }, signInConstraints);
              if (error) {
                createAlert('Error', error.confirmPassword[0]);
                return;
              }
              signUp(email, password);
              navigation.navigate('DemographicForm');
            } }
          />
          <View style={ { flexDirection: 'row', alignItems: 'center' } }>
            <View style={ { flex: 1, height: 1, backgroundColor: '#B1B1B1', marginLeft: 15 } }/>
            <View>
              <Text style={ { textAlign: 'center', paddingHorizontal: 10, fontSize: 14 } }>Or signup with</Text>
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
            />
            <View style={ { flexDirection: 'row', } }>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={ () => navigation.navigate('Login') }>
                <Text style={ { color: '#9078A8' } }> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
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
    width: width * 1.6,
    height: '15%'
  }
});


