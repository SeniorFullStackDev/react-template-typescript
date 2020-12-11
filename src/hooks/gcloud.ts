import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function useProtectedRoute() {
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.error('Access to protected route denied, redirecting to login...');
        // history.push("/auth/login");
      } else {
        console.log('user has a token');
      }
    });
  }, [history]);
}
