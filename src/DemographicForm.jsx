import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Icon, Input, Text } from 'react-native-elements';
import CheckboxGroup from './components/CheckboxGroup';
import { LinearGradient } from 'expo-linear-gradient';
import { CountryPicker, StatePicker } from './components/Pickers';
import { useAuth } from './contexts/AuthContext';
import { validate } from 'validate.js';
import { demographicFormConstraints } from './constraints';

const { width, height } = Dimensions.get('window');


export default function DemographicForm() {
  const { email, createUser } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [dob, setDob] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [race, setRace] = useState('');
  const [skills, setSkills] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');
  const [stateError, setStateError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [dobError, setDobError] = useState('');

  const handleFormSubmission = () => {
    setFirstNameError('');
    setLastNameError('');
    setGenderError('');
    setPhoneNumberError('');
    setAddressError('');
    setCityError('');
    setZipCodeError('');
    setStateError('');
    setCountryError('');
    setDobError('');

    let error = validate({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dob: dob,
      address: address,
      city: city,
      state: state,
      country: country,
      zipCode: zipCode,
      phoneNumber: phoneNumber
    }, demographicFormConstraints);
    console.log(error);
    if (error !== undefined) {
      if (error['firstName'] !== undefined) {
        setFirstNameError(error['firstName'][0]);
        return;
      }
      if (error['lastName'] !== undefined) {
        setLastNameError(error['lastName'][0]);
        return;
      }
      if (error['dob'] !== undefined) {
        setDobError(error['dob'][0]);
        return;
      }
      if (error['gender'] !== undefined) {
        setGenderError(error['gender'][0]);
        return;
      }
      if (error['phoneNumber'] !== undefined) {
        setPhoneNumberError(error['phoneNumber'][0]);
        return;
      }
      if (error['address'] !== undefined) {
        setAddressError(error['address'][0]);
        return;
      }
      if (error['city'] !== undefined) {
        setCityError(error['city'][0]);
        return;
      }
      if (error['zipCode'] !== undefined) {
        setZipCodeError(error['zipCode'][0]);
        return;
      }
      if (error['state'] !== undefined) {
        setStateError(error['state'][0]);
        return;
      }
      if (error['country'] !== undefined) {
        setCountryError(error['country'][0]);
        return;
      }
    }

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      gender: gender,
      phone_number: phoneNumber,
      dob: dob,
      street_1: address,
      street_2: address2,
      city: city,
      state: state,
      zip: zipCode,
      country: country,
      race: race,
      ethnicity: ethnicity,
      skills: skills,
      linkedin: '',
      company: '',
      role: 'volunteer'
    };
    createUser(userData);

  };


  return (
    <View style={ styles.container }>
      <LinearGradient
        colors={ ['#F07878', '#F0C090'] }
        style={ styles.gradient }>
        <ScrollView>
          <View style={ styles.formContainer }>
            <View style={ { marginBottom: height * 0.0295 } }>
              <Text style={ styles.headerText }>Almost Done...</Text>
              <Text style={ { fontSize: 18, color: '#fff', paddingVertical: height * 0.0098 } }>Please answer the
                                                                                                following questions so
                                                                                                we can get to know you
                                                                                                better and maybe send
                                                                                                you a little something
                                                                                                on your birthday or
                                                                                                volunteer
                                                                                                anniversary:</Text>
              <Text style={ { fontSize: 14, color: '#fff' } }><Icon name="asterisk" color="#fff" type="font-awesome-5"
                size={ 10 }/> = required</Text>
            </View>
            <View style={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } }>
              <Input
                label={ <Text style={ styles.bodyText }>First Name: <Icon name="asterisk" color="#fff"
                  type="font-awesome-5" size={ 10 }/></Text> }
                inputStyle={ styles.inputStyle }
                containerStyle={ { width: width * 0.41, paddingHorizontal: 0 } }
                inputContainerStyle={ { borderBottomColor: '#fff' } }
                value={ firstName }
                onChangeText={ setFirstName }
                autoCorrect={ false }
                errorStyle={ { color: 'red', fontWeight: 'bold' } }
                errorMessage={ firstNameError }
              />
              <Input
                label={ <Text style={ styles.bodyText }>Last Name: <Icon name="asterisk" color="#fff"
                  type="font-awesome-5" size={ 10 }/></Text> }
                inputStyle={ styles.inputStyle }
                containerStyle={ { width: width * 0.41, paddingHorizontal: 0 } }
                inputContainerStyle={ { borderBottomColor: '#fff' } }
                value={ lastName }
                onChangeText={ setLastName }
                autoCorrect={ false }
                errorStyle={ { color: 'red', fontWeight: 'bold' } }
                errorMessage={ lastNameError }
              />
            </View>
            <Input
              label={ <Text style={ styles.bodyText }>Date of Birth (MM/DD): <Icon name="asterisk" color="#fff"
                type="font-awesome-5"
                size={ 10 }/></Text> }
              inputStyle={ styles.inputStyle }
              containerStyle={ { paddingHorizontal: 0 } }
              inputContainerStyle={ { borderBottomColor: '#fff' } }
              value={ dob }
              onChangeText={ setDob }
              errorStyle={ { color: 'red', fontWeight: 'bold' } }
              errorMessage={ dobError }
            />
            <View>
              <Text style={ styles.bodyText }>Select your gender: <Icon name="asterisk" color="#fff"
                type="font-awesome-5" size={ 10 }/></Text>
              <CheckboxGroup activeValue={ gender } setActiveValue={ setGender } options={ genderOptions }/>
              { (genderError.length > 0) ? <Text style={ styles.errorText }>{ genderError }</Text> : <></> }
            </View>
            <View>
              <Text style={ styles.bodyText }>Are you Hispanic/Latino?:</Text>
              <CheckboxGroup activeValue={ ethnicity } setActiveValue={ setEthnicity } options={ ethnicityOptions }/>
            </View>
            <View>
              <Text style={ styles.bodyText }>Please identify your race:</Text>
              <CheckboxGroup activeValue={ race } setActiveValue={ setRace } options={ raceOptions }/>
            </View>
            <Text style={ styles.smallText }>Note: Many funders require demographic information about our organization
                                             such as race, ethnicity, and gender. These are optional and also, we hope
                                             you&#39;ll share this personal information with us to help 50/50
                                             Leadership&#39;s fundraising efforts.</Text>
            <Input
              label={ <Text style={ styles.bodyText }>Phone Number: <Icon name="asterisk" color="#fff"
                type="font-awesome-5" size={ 10 }/></Text> }
              inputStyle={ styles.inputStyle }
              containerStyle={ { paddingHorizontal: 0 } }
              inputContainerStyle={ { borderBottomColor: '#fff' } }
              value={ phoneNumber }
              onChangeText={ setPhoneNumber }
              errorStyle={ { color: 'red', fontWeight: 'bold' } }
              errorMessage={ phoneNumberError }
            />
            <Input
              label={ <Text style={ styles.bodyText }>Address: <Icon name="asterisk" color="#fff" type="font-awesome-5"
                size={ 10 }/></Text> }
              inputStyle={ styles.inputStyle }
              containerStyle={ { paddingHorizontal: 0 } }
              inputContainerStyle={ { borderBottomColor: '#fff' } }
              value={ address }
              onChangeText={ setAddress }
              errorStyle={ { color: 'red', fontWeight: 'bold' } }
              errorMessage={ addressError }
            />
            <Input
              label={ <Text style={ styles.bodyText }>Address 2:</Text> }
              inputStyle={ styles.inputStyle }
              containerStyle={ { paddingHorizontal: 0 } }
              inputContainerStyle={ { borderBottomColor: '#fff' } }
              value={ address2 }
              onChangeText={ setAddress2 }
            />
            <Input
              label={ <Text style={ styles.bodyText }>City: <Icon name="asterisk" color="#fff" type="font-awesome-5"
                size={ 10 }/></Text> }
              inputStyle={ styles.inputStyle }
              containerStyle={ { paddingHorizontal: 0 } }
              inputContainerStyle={ { borderBottomColor: '#fff' } }
              value={ city }
              onChangeText={ setCity }
              errorStyle={ { color: 'red', fontWeight: 'bold' } }
              errorMessage={ cityError }
            />
            <View style={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } }>
              <Input
                label={ <Text style={ styles.bodyText }>Zip Code: <Icon name="asterisk" color="#fff"
                  type="font-awesome-5" size={ 10 }/></Text> }
                inputStyle={ styles.inputStyle }
                containerStyle={ { width: width * 0.253, paddingHorizontal: 0 } }
                inputContainerStyle={ { borderBottomColor: '#fff' } }
                value={ zipCode }
                onChangeText={ setZipCode }
                errorStyle={ { color: 'red', fontWeight: 'bold' } }
                errorMessage={ zipCodeError }
              />
              <StatePicker setState={ setState }/>
              { (stateError.length > 0) ? <Text style={ styles.errorText }>{ stateError }</Text> : <></> }
              <CountryPicker setCountry={ setCountry }/>
              { (countryError.length > 0) ? <Text style={ styles.errorText }>{ countryError }</Text> : <></> }
            </View>
            <Input
              label={ <Text style={ styles.bodyText }>Profession/Relevant Skills:</Text> }
              inputStyle={ styles.inputStyle }
              containerStyle={ { paddingHorizontal: 0 } }
              inputContainerStyle={ {
                borderColor: '#fff',
                borderWidth: 1,
                borderRadius: 15,
                marginVertical: height * 0.00985
              } }
              value={ skills }
              onChangeText={ setSkills }
            />
            <Button
              title="Submit"
              buttonStyle={ styles.submitButton }
              containerStyle={ {
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.024,
                marginBottom: height * 0.015,
              } }
              titleStyle={ { color: '#FFFFFF', fontSize: 18 } }
              onPress={ handleFormSubmission }
            />
          </View>
        </ScrollView>
      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradient: {
    display: 'flex',
    flex: 1,
  },
  formContainer: {
    marginHorizontal: width * 0.066,
    marginVertical: height * 0.123,
  },
  headerText: {
    fontSize: 36,
    color: '#fff'
  },
  bodyText: {
    fontSize: 18,
    color: '#fff',
  },
  smallText: {
    fontSize: 12,
    color: '#fff',
    paddingVertical: height * 0.0147,
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: height * 0.0049,
  },
  inputStyle: {
    color: '#fff',
  },
  submitButton: {
    width: width * 0.7,
    backgroundColor: '#9078A8',
    borderRadius: 30,
  }
});

const genderOptions = [
  {
    id: 0,
    title: 'Male',
    value: 'M',
    checked: false,
  },
  {
    id: 1,
    title: 'Female',
    value: 'F',
    checked: false,
  },
  {
    id: 2,
    title: 'Non-Binary',
    value: 'NB',
    checked: false,
  },
  {
    id: 3,
    title: 'Other',
    value: 'O',
    checked: false,
  }
];

const ethnicityOptions = [
  {
    id: 0,
    title: 'Yes',
    value: 'Hispanic/Latino',
    checked: false,
  },
  {
    id: 1,
    title: 'No',
    value: 'Non Hispanic/Latino',
    checked: false,
  },
  {
    id: 2,
    title: 'Decline to self-identify',
    value: 'Unspecified',
    checked: false,
  }
];

const raceOptions = [
  {
    id: 0,
    title: 'American Indian or Alaskan Native',
    value: 'American Indian or Alaskan Native',
    checked: false,
  },
  {
    id: 1,
    title: 'Asian',
    value: 'Asian',
    checked: false,
  },
  {
    id: 2,
    title: 'Black or African American',
    value: 'Black or African American',
    checked: false,
  },
  {
    id: 3,
    title: 'White',
    value: 'White',
    checked: false,
  },
  {
    id: 4,
    title: 'Native Hawaiian or Other Pacific Islander',
    value: 'Native Hawaiian or Other Pacific Islander',
    checked: false,
  },
  {
    id: 5,
    title: 'Two or More Races',
    value: 'Two or More Races',
    checked: false,
  },
  {
    id: 6,
    title: 'Decline to self-identify',
    value: 'Decline to self-identify',
    checked: false,
  },
];

