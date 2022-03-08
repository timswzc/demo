import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Divider, Icon, ListItem, Text } from 'react-native-elements';
import { addTeamMember, getTeamJoinRequests, removeTeamMember } from './requests';
import { wait } from './Utility';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');


export default function TeamAcceptMembers({ route }) {
  const { team } = route.params;
  const isFocused = useIsFocused();
  const [teamRequests, setTeamRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    if (isFocused) {
      getTeamJoinRequests(team.id)
        .then(response => {
          setTeamRequests(response);
        })
        .catch(error => console.log(error));
    }
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const requests = teamRequests.map((item, index) => {

    const handleAddMember = (team_id, item_id) => {
      addTeamMember(team_id, item_id);
      setTeamRequests(teamRequests.filter(item => item.id !== item_id));
    };

    const handleRemoveMember = (team_id, item_id) => {
      removeTeamMember(team_id, item_id);
      setTeamRequests(teamRequests.filter(item => item.id !== item_id));
    };

    return (
      <ListItem key={ index } bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={ styles.subHeaderText }>{ item.first_name } { item.last_name }</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content right style={ { display: 'flex', flexDirection: 'row', justifyContent: 'space-around' } }>
          <ListItem.Title>
            <TouchableOpacity onPress={ () => {
              handleAddMember(team.id, item.id);
            } }>
              <Icon name="checkmark-circle" color="green" type="ionicon"/>
            </TouchableOpacity>
          </ListItem.Title>
          <ListItem.Title>
            <TouchableOpacity onPress={ () => {
              handleRemoveMember(team.id, item.id);
            } }>
              <Icon name="close-circle" color="red" type="ionicon"/>
            </TouchableOpacity>
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>);
  });


  return (
    <View style={ styles.container }>
      <ScrollView
        contentContainerStyle={ styles.scrollView }
        refreshControl={
          <RefreshControl
            refreshing={ refreshing }
            onRefresh={ onRefresh }
          />
        }
      >
        <View style={ styles.subContainer }>
          <Text style={ styles.headerText }>Requests to Join Team</Text>
          <View style={ { paddingVertical: height * 0.0197 } }>
            <Divider/>
            { (teamRequests.length !== 0) ?
              requests
              :
              <Text style={ styles.subHeaderText }>There are currently no new requests</Text>
            }
          </View>
        </View>
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
    paddingVertical: height * 0.00985,
  },

});

TeamAcceptMembers.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};
