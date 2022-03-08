import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Dimensions, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createAlert, wait } from './Utility';
import { Button, Divider, ListItem, Text } from 'react-native-elements';
import { getAssignedTeams, removeTeamMember } from './requests';

const { width, height } = Dimensions.get('window');

export default function Team() {
  const { uid } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [assignedTeams, setAssignedTeams] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    function assign() {
      getAssignedTeams(uid)
        .then(response => {
          setAssignedTeams(response);
        });
    }

    if (isFocused) {
      assign();
    }
  }, [refreshing]);

  const TeamCards = assignedTeams.map((item, index) => {
    const handleRemoveItem = (team_id) => {
      console.log('Removing Team...');
      removeTeamMember(team_id, uid);
      setAssignedTeams(assignedTeams.filter(item => item.id !== team_id));
    };

    return (
      <View key={ index }>
        { item.is_approved === true ?
          <TouchableOpacity onPress={ () => {
            navigation.navigate('Team Home', { team: item });
          } }>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={ styles.teamsText }>{ item.name } Team</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
          :

          <ListItem.Swipeable bottomDivider
            leftContent={
              <Button
                title="Delete"
                icon={ { name: 'trash', type: 'ionicon', color: '#fff' } }
                buttonStyle={ { minHeight: '100%', backgroundColor: '#FF0000' } }
                onPress={ () => {
                  handleRemoveItem(item.id);
                } }
              />
            }>
            <ListItem.Content>
              <ListItem.Title style={ styles.disabledTeamsText }>{ item.name } Team</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right>
              <ListItem.Title style={ { color: '#B8B8B8', fontSize: 14 } }>Pending Approval</ListItem.Title>
            </ListItem.Content>
          </ListItem.Swipeable>

        }
      </View>

    );
  });

  return (
    <View style={ styles.container }>
      <ScrollView
        contentContainerStyle={ styles.scrollView }
        refreshControl={
          <RefreshControl
            refreshing={ refreshing }
            onRefresh={ onRefresh }/>
        }>
        { (assignedTeams.length !== 0) ?
          <View style={ styles.subContainer }>
            <Text style={ styles.headerText }>Teams</Text>
            <View style={ { marginVertical: height * 0.0295 } }>
              <Divider/>
              { TeamCards }
            </View>
            <Button
              title="Join Another Team"
              buttonStyle={ styles.joinTeamButton }
              containerStyle={ {
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.024,
                marginBottom: height * 0.015,
              } }
              titleStyle={ { color: '#FFFFFF', fontSize: 18 } }
              onPress={ () => {
                if (assignedTeams.length < 3) {
                  navigation.navigate('Join Team');
                } else {
                  createAlert('Request Denied', 'You are already assinged to the maximum number of teams');
                }
              } }
            />
          </View>
          :
          <View style={ styles.subContainer }>
            <Text style={ styles.headerText }>You are not currently assigned to a team</Text>
            <Button
              title="Join Team"
              buttonStyle={ styles.joinTeamButton }
              containerStyle={ {
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: height * 0.024,
                marginBottom: height * 0.015,
              } }
              titleStyle={ { color: '#FFFFFF', fontSize: 18 } }
              onPress={ () => {
                navigation.navigate('Join Team');
              } }
            />
          </View>
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
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
  },
  disabledTeamsText: {
    fontSize: 24,
    color: '#B8B8B8'
  }


});
