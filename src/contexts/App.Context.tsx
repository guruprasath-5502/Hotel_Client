import { useValidateToken } from '@/api/UserApi';
import React, { useContext } from 'react';

type AppContext = {
  isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError, isLoading } = useValidateToken();

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError && !isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
