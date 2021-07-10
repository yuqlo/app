import firebase from 'firebase/app';
import { createContext } from 'react';

export const AuthContext = createContext<firebase.User | 'loading' | null>(
  'loading'
);
