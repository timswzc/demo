import React, { useEffect, useState } from 'react';
//import { useNavigation } from '@react-navigation/native';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from './contexts/AuthContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAssignedTeams, logHours } from './requests';

const { width, height } = Dimensions.get('window');

export default function LogHours() {
  //const navigation = useNavigation();
  const { uid } = useAuth();
  const isFocused = useIsFocused();
  const [hoursWorked, setHoursWorked] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [teamValue, setTeamValue] = useState([]);
  const [description, setDescription] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getAssignedTeams(uid)
        .then(response => {
          let temp = response
            .filter(item => item.is_approved === true)
            .map((item) => ({ label: item.name, value: item.id }));
          setItems(temp);
        })
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <View style={ styles.container }>
      <View style={ styles.subContainer }>
        <Text style={ { fontSize: 36 } }>Log Hours</Text>
        <Text style={ { color: 'black', fontWeight: 'bold', fontSize: 24 } }>Enter Hours Worked:</Text>
        <Input
          placeholder="Hours Worked"
          onChangeText={ setHoursWorked }
          value={ hoursWorked }
          autoComplete={ false }
          autoCorrect={ false }
          keyboardType="numeric"
          inputContainerStyle={ {
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0,
          } }
          containerStyle={ styles.inputContainer }
        />
        <Text style={ { color: 'black', fontWeight: 'bold', fontSize: 24 } }>Description:</Text>
        <Input
          placeholder="Description"
          onChangeText={ setDescription }
          value={ description }
          autoComplete={ false }
          autoCorrect={ false }
          inputContainerStyle={ {
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0,
          } }
          containerStyle={ styles.inputContainerWide }
        />
        <DropDownPicker
          placeholder="Select a Team"
          open={ open }
          value={ teamValue }
          items={ items }
          setOpen={ setOpen }
          setValue={ setTeamValue }
          setItems={ setItems }
          loading={ loading }/>
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
          onPress={ () => logHours(hoursWorked, teamValue, uid, description) }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 100,
  },
  subContainer: {
    marginHorizontal: width * 0.066,
    marginVertical: height * 0.123,
  },
  inputContainer: {
    width: width * 0.7,
    height: height * 0.05,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#D1D1D1',
    backgroundColor: '#FFFFFF',
  },
  inputContainerWide: {
    width: width * 0.7,
    height: height * 0.1,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#D1D1D1',
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    width: width * 0.7,
    backgroundColor: '#9078A8',
    borderRadius: 30,
  },
  svgCurve: {
    width: width * 1.1,
    height: height * 0.11
  }
});
