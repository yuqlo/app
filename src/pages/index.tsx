import firebase from 'firebase/app';
import { useCallback, useContext } from 'react';
import { AuthContext } from 'src/authContext';
import { auth } from 'src/firebase';

const Home = () => {
  console.log('Render home.');
  const currentUser = useContext(AuthContext);
  const signInWithGoogle = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  }, []);
  const signOut = useCallback(() => auth.signOut(), []);
  if (currentUser === 'loading') {
    return (
      <>
        {console.log('Render loading.')}
        loading
      </>
    );
  } else if (currentUser) {
    return (
      <>
        {console.log('Render sign out.')}
        <button onClick={signOut}>ログアウト</button>
      </>
    );
  } else {
    return (
      <>
        {console.log('Render sign in.')}
        <button onClick={signInWithGoogle}>ログイン</button>
      </>
    );
  }
};

export default Home;
