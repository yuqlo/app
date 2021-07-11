import firebase from 'firebase/app';
import { useCallback, useContext } from 'react';
import { AuthContext } from 'src/authContext';
import { auth, db } from 'src/firebase';

const Home = () => {
  console.log('Render home.');
  const currentUser = useContext(AuthContext);
  const signInWithGoogle = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  }, []);
  const signOut = useCallback(() => auth.signOut(), []);
  const deleteUser = useCallback(() => {
    if (currentUser !== 'loading' && currentUser !== null) {
      db.collection('users')
        .doc(currentUser.uid)
        .delete()
        .then(() => currentUser.delete());
    }
  }, [currentUser]);
  if (currentUser === 'loading') {
    return (
      <>
        {console.log('Render loading.')}
        loading
      </>
    );
  } else if (currentUser === null) {
    return (
      <>
        {console.log('Render sign in.')}
        <button onClick={signInWithGoogle}>ログイン</button>
        <button onClick={signInWithGoogle}>アカウントを作成</button>
      </>
    );
  } else {
    return (
      <>
        {console.log('Render sign out.')}
        <button onClick={signOut}>ログアウト</button>
        <button onClick={deleteUser}>アカウントを削除</button>
      </>
    );
  }
};

export default Home;
