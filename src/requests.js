import { db } from './firebase';
import firebase from 'firebase/compat/app';

export const getTeams = async () => {
  const teamsRef = await db.collection('Team').get();

  return teamsRef.docs
    .filter(doc => doc.exists)
    .map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getTeamById = async (teamId) => {
  const teamRef = await db.collection('Team').doc(teamId).get();
  return { id: teamRef.id, ...teamRef.data() };
};

export const createTeam = (teamData) => {
  db.collection('Team').add(teamData)
    .then((docRef) => docRef.id)
    .catch((error) => console.log(error));
};

export const setTeamLeader = async (teamId, userId) => {
  const teamRef = await db.collection('Team').get(teamId);
  teamRef.update({
    team_leader: userId
  }).catch((error) => console.log(error));
};

export const getUser = async (userId) => {
  const userRef = await db.collection('User').doc(userId).get();
  return { id: userRef.id, ...userRef.data() };
};

export const getTeamMembers = async (teamId) => {
  const junctions = await db.collection('TeamAssignment')
    .where('team_id', '==', `${ teamId }`)
    .get();
  const members = await Promise.all(
    junctions.docs
      .filter(doc => doc.exists && doc.data().is_approved === true)
      .map(doc => db.doc(`User/${ doc.data().user_id }`).get())
  );

  return members.filter(doc => doc.exists).map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getTeamJoinRequests = async (teamId) => {
  const junctions = await db.collection('TeamAssignment')
    .where('team_id', '==', `${ teamId }`)
    .get();
  const members = await Promise.all(
    junctions.docs
      .filter(doc => doc.exists && doc.data().is_approved === false)
      .map(doc => db.doc(`User/${ doc.data().user_id }`).get())
  );

  return members.filter(doc => doc.exists).map(doc => ({ id: doc.id, ...doc.data() }));
};


export const getAssignedTeams = async (uid) => {
  const junctions = await db.collection('TeamAssignment')
    .where('user_id', '==', `${ uid }`)
    .get();
  let approved_list = [];
  const teams = await Promise.all(
    junctions.docs
      .map(doc => {
        approved_list.push(doc.data().is_approved);
        return db.doc(`Team/${ doc.data().team_id }`).get();
      })
  );

  return teams.filter(doc => doc.exists).map((doc, i) => {
    return { id: doc.id, ...doc.data(), is_approved: approved_list[i] };
  });
};

export const requestJoinTeam = async (teamId, userId) => {
  return await db.collection('TeamAssignment')
    .doc(`${ userId }_${ teamId }`)
    .set({ team_id: teamId, user_id: userId, is_approved: false });
};

export const addTeamMember = async (teamId, userId) => {
  const junctionRef = db.doc(`TeamAssignment/${ userId }_${ teamId }`);
  await junctionRef.set({ team_id: teamId, user_id: userId, is_approved: true });
};

export const removeTeamMember = (teamId, userId) => {
  const teamRef = db.doc(`TeamAssignment/${ userId }_${ teamId }`);
  teamRef.delete()
    .then(() => console.log('Document Succesfully Deleted'))
    .catch(error => console.log(error));
};

export const logHours = async (quantity, teamId, userId, description = '') => {
  await db.collection('Hours').add({
    hours_worked: quantity,
    team_id: teamId,
    user_id: userId,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    description: description,
  });
};

export const getTeamHours = async (teamId) => {
  const teamHoursRef = await db.collection('Hours')
    .where('team_id', '==', teamId)
    .get();

  return teamHoursRef.docs
    .filter(doc => doc.exists)
    .map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getUserHours = async (userId) => {
  const userHoursRef = await db.collection('Hours')
    .where('user_id', '==', userId)
    .get();

  return userHoursRef.docs
    .filter(doc => doc.exists)
    .map(doc => ({ id: doc.id, ...doc.data() }));
};

export const setRoleToAdmin = (userId) => {
  const userRef = db.collection('User').get(userId);
  userRef.update({
    role: 'admin'
  }).catch((error) => console.log(error));
};
