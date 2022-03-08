import React, { createContext, useContext, useState } from 'react';
import { auth, db } from '../firebase';
import PropTypes from 'prop-types';

const AuthContext = createContext({
  user: null,
  uid: '',
  email: '',
  google: false,
  loading: false,
  signUp: () => {
  },
  createUser: () => {
  },
  signIn: () => {
  },
  signInGoogle: () => {
  },
  signOut: () => {
  },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        setEmail(email);
        setUid(userCredentials.user.uid);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const signIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        setUid(userCredentials.user.uid);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const createUser = (userData) => { //Creates a user in the database
    const usersRef = db.collection('User');
    usersRef
      .doc(uid)
      .set(userData)
      .then(() => {
        setUser(userData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const signOutMain = () => {
    signOut();
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log('Sign out successful');
        setUser(null);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const signInGoogle = async () => {

  };

  return (
    <AuthContext.Provider
      value={ { user, uid, email, loading, signIn, createUser, signInGoogle, signUp, signOutMain } }>
      { children }
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
