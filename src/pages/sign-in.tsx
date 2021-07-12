import firebase from 'firebase/app';
import { useRouter } from 'next/dist/client/router';
import { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from 'src/authContext';
import { auth } from 'src/firebase';

const SignIn = () => {
  console.log('Render sign in.');
  const currentUser = useContext(AuthContext);
  const router = useRouter();
  const signInWithGoogle = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  }, []);
  useEffect(() => {
    if (currentUser !== 'loading' && currentUser !== null) router.push('/');
  }, [currentUser]);
  if (currentUser !== null) {
    return (
      <>
        {console.log('Render firebase.User | "loading"')}
        loading
      </>
    );
  } else {
    return (
      <>
        {console.log('Render null.')}
        <button onClick={signInWithGoogle}>ログイン</button>
      </>
    );
  }
};

export default SignIn;
