import 'src/styles/globals.css';
import type { AppProps } from 'next/app';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { AuthContext } from 'src/authContext';
import { auth, db } from 'src/firebase';

const MyApp = (props: AppProps) => {
  console.log('Render my app.');
  const [currentUser, setCurrentUser] = useState<
    firebase.User | 'loading' | null
  >('loading');
  useEffect(() => {
    console.log('Render my app 3.');
    auth.onAuthStateChanged((user) => {
      if (user) {
        auth.getRedirectResult().then((result) => {
          if (result.additionalUserInfo?.isNewUser) {
            const uid = result.user?.uid;
            const initialData = {
              initialData: {
                createdAt: firebase.firestore.Timestamp.now(),
                email: result.user?.email,
              },
            };
            db.collection('users').doc(uid).set(initialData);
            setCurrentUser(user);
          } else {
            setCurrentUser(user);
          }
        });
      } else {
        setCurrentUser(null);
      }
    });
  }, []);
  return (
    <>
      {console.log('Render my app 2.')}
      <AuthContext.Provider value={currentUser}>
        <props.Component {...props.pageProps} />
      </AuthContext.Provider>
    </>
  );
};

export default MyApp;
