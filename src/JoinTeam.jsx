import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { useAuth } from './contexts/AuthContext';
import { Button, Text } from 'react-native-elements';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getTeams, requestJoinTeam } from './requests';

const { width, height } = Dimensions.get('window');

export default function JoinTeam() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { uid } = useAuth();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [teams, setTeams] = useState([]);
  const [items, setItems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getTeams()
        .then(response => {
          setTeams(response);
          let temp = response.map((item) => ({ label: item.name, value: item.id }));
          setItems(temp);
        })
        .catch(error => console.log(error));
    }

  }, []);

  return (
    <View style={ styles.container }>
      <View style={ styles.subContainer }>
        <Text style={ styles.headerText }>Select team(s) to join:</Text>
        <Text style={ styles.bodyText }>You can select up to three teams</Text>
        <DropDownPicker
          open={ open }
          value={ value }
          mode="BADGE"
          items={ items }
          setOpen={ setOpen }
          setValue={ setValue }
          setItems={ setItems }
          multiple={ true }
          loading={ loading }
          min={ 0 }
          max={ 3 }/>
        <Button
          title="Request to Join Team"
          buttonStyle={ styles.joinTeamButton }
          containerStyle={ {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: height * 0.024,
            marginBottom: height * 0.015,
          } }
          titleStyle={ { color: '#FFFFFF', fontSize: 18 } }
          onPress={ () => {
            value.forEach((item) => requestJoinTeam(item, uid).catch(error => console.log(error)));
            Alert.alert(
              'Success!',
              'Your request(s) have been successfully send to the leader of each team',
              [
                {
                  text: 'Close',
                  onPress: () => {
                    navigation.navigate('Team Select');
                  }
                }
              ],
            );

          } }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    marginHorizontal: width * 0.066,
    marginVertical: height * 0.123,
  },
  joinTeamButton: {
    width: width * 0.7,
    backgroundColor: '#9078A8',
    borderRadius: 30,
  },
  headerText: {
    fontSize: 36,
  },
  subHeaderText: {
    fontSize: 24
  },
  bodyText: {
    fontSize: 18,
  },
  teamsText: {
    fontSize: 24,
    paddingVertical: height * 0.00985,
  },

});
