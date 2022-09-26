import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

export const useUser = () => useAuthState(auth);