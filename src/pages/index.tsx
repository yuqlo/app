import Link from 'next/link';
import { useCallback, useContext } from 'react';
import { AuthContext } from 'src/authContext';
import { auth, db } from 'src/firebase';

const Home = () => {
  console.log('Render home.');
  const currentUser = useContext(AuthContext);
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
        {console.log('Render "loading".')}
        loading
      </>
    );
  } else if (currentUser === null) {
    return (
      <>
        {console.log('Render null.')}
        <Link href="/sign-in">
          <a>ログインページ</a>
        </Link>
        <Link href="/sign-up">
          <a>アカウント作成ページ</a>
        </Link>
      </>
    );
  } else {
    return (
      <>
        {console.log('Render firebase.User.')}
        <button onClick={signOut}>ログアウト</button>
        <button onClick={deleteUser}>アカウントを削除</button>
      </>
    );
  }
};

export default Home;
