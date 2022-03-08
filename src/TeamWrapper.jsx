import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Team from './Team';
import TeamHome from './TeamHome';
import JoinTeam from './JoinTeam';
import TeamAcceptMembers from './TeamAcceptMembers';

function TeamWrapper() {

  const TeamStack = createStackNavigator();

  return (
    <TeamStack.Navigator>
      <TeamStack.Screen name="Team Select" component={ Team }/>
      <TeamStack.Screen name="Team Home" component={ TeamHome }/>
      <TeamStack.Screen name="Join Team" component={ JoinTeam }/>
      <TeamStack.Screen name="Accept Team Members" component={ TeamAcceptMembers }/>
    </TeamStack.Navigator>
  );
}

export default TeamWrapper;
