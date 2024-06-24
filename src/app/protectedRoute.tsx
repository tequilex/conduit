import { Navigate } from 'react-router-dom';
import { useStores } from './RootStore.context';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const {
    userStore: { user },
  } = useStores();

  if (user === null) {
    return (
      <Navigate
        to='/signIn'
        replace
      />
    );
  }

  return children;
};
