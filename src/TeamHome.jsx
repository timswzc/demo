import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuth } from './contexts/AuthContext';
import { Divider, Icon, ListItem, Text } from 'react-native-elements';
import { getTeamMembers, getUser } from './requests';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

export default function TeamHome({ navigation, route }) {
  const { team } = route.params;
  const { uid, user } = useAuth();
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLeader, setTeamLeader] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getTeamMembers(team.id)
        .then(response => setTeamMembers(response))
        .catch(error => console.log(error));

      getUser(team.team_leader)
        .then(response => {
          setTeamLeader(response);
        })
        .catch(error => console.log(error));
    }
  }, []);

  useLayoutEffect(() => {
    if (team.team_leader === uid || user.role === 'admin') { //If the current user is the team leader of this team, or an admin
      navigation.setOptions({
        headerRight: () => (
          <View style={ {
            display: 'flex',
            flexDirection: 'row',
            marginHorizontal: width * 0.066,
            justifyContent: 'space-between'
          } }>
            <TouchableOpacity onPress={ () => {
            } }>
              <Icon name="bell-outline" type="material-community"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => {
            } }>
              <Icon name="chatbox-outline" type="ionicon"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => navigation.navigate('Accept Team Members', { team: team }) }>
              <Icon style={ { paddingHorizonal: width * 0.2113 } } name="person-add-outline" type="ionicon"/>
            </TouchableOpacity>
          </View>
        )
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <View style={ {
            display: 'flex',
            flexDirection: 'row',
            marginHorizontal: width * 0.066,
            justifyContent: 'space-between'
          } }>
            <TouchableOpacity onPress={ () => {
            } }>
              <Icon name="bell-outline" type="material-community"/>
            </TouchableOpacity>
          </View>
        )
      });
    }
  });

  const MemberCards = teamMembers.map((item, index) => {
    return (
      <ListItem key={ index } bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={ styles.subHeaderText }>{ item.first_name } { item.last_name }</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  });

  return (
    <View style={ styles.container }>
      <View style={ styles.subContainer }>
        <Text style={ [styles.headerText, { paddingBottom: height * 0.0295 }] }>{ team.name } Team</Text>
        <Text style={ [styles.subHeaderText, { paddingBottom: height * 0.0886 }] }>Team
                                                                                   Leader: { teamLeader.first_name } { teamLeader.last_name }</Text>
        <Text style={ styles.subHeaderText }>Members</Text>
        <View style={ { paddingVertical: height * 0.0197 } }>
          <Divider/>
          { MemberCards }
        </View>
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

TeamHome.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired
};
