import { useValidateToken } from '@/api/UserApi';
import React, { useContext } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || '';

type AppContext = {
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  stripePromise: Promise<Stripe | null>;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError, isLoading } = useValidateToken();

  return (
    <AppContext.Provider
      value={{
        isAuthLoading: isLoading,
        isLoggedIn: !isError && !isLoading,
        stripePromise,
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
