import 'src/styles/globals.css';
import type { AppProps } from 'next/app';
import firebase from 'firebase/app';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { AuthContext } from 'src/authContext';
import { auth, db } from 'src/firebase';

const MyApp = (props: AppProps) => {
  console.log('Render my app.');
  const [currentUser, setCurrentUser] = useState<
    firebase.User | 'loading' | null
  >('loading');
  const router = useRouter();
  useEffect(() => {
    console.log('Render my app 3.');
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        db.collection('users')
          .doc(uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log('Set currentUser to user.');
              setCurrentUser(user);
            } else {
              if (router.pathname === '/sign-up') {
                console.log('アカウントを作成しました。');
                const initialData = {
                  initialData: {
                    createdAt: firebase.firestore.Timestamp.now(),
                    email: user.email,
                  },
                };
                db.collection('users').doc(uid).set(initialData);
                console.log('Set currentUser to user 2.');
                setCurrentUser(user);
              } else if (router.pathname === '/sign-in') {
                console.log('アカウントが見つかりませんでした。');
                user.delete();
              }
            }
          });
      } else {
        console.log('Set currentUser to null.');
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
