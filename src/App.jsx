import 'react-native-gesture-handler';
import React from 'react';
import { Router } from './Router';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
}
