import { RegisterFormData } from '@/pages/Register';
import { SignInFormData } from '@/pages/SignIn';
import { AllHotels, UserType } from '@/types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useRegisterUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const registerUserRequest = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }
  };

  const { mutate: registerUser, isLoading } = useMutation(registerUserRequest, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      toast.success('User Registered Successfully');
      navigate('/');
    },
    onError: () => {
      toast.error('User already exists');
    },
  });

  return {
    registerUser,
    isLoading,
  };
};

export const useSignInUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const signInUserRequest = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to Sign In user');
    }
  };

  const { mutate: signInUser, isLoading } = useMutation(signInUserRequest, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      toast.success('User Signed In Successfully');
      navigate(location.state?.from?.pathname || '/');
    },
    onError: () => {
      toast.error('Invalid Credentials');
    },
  });

  return {
    signInUser,
    isLoading,
  };
};

export const useSignOutUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const signOutUserRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed Sign Out`);
    }
  };

  const { mutate: signOutUser, isLoading } = useMutation(signOutUserRequest, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      toast.success('User Signed Out Successfully');
      navigate('/');
    },
    onError: () => {
      toast.error('Failed Sign Out');
    },
  });

  return {
    signOutUser,
    isLoading,
  };
};

export const useValidateToken = () => {
  const getValidateTokenRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Invalid Credentials');
    }
  };

  const {
    data: validateToken,
    isError,
    isLoading,
  } = useQuery('validateToken', getValidateTokenRequest, {
    retry: false,
  });

  return {
    validateToken,
    isError,
    isLoading,
  };
};

export const useGetCurrentUser = () => {
  const getCurrentUserRequest = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error fetching user');
    }

    return response.json();
  };

  const { data: user, isLoading } = useQuery(
    'getCurrentUser',
    getCurrentUserRequest,
    {
      retry: false,
    }
  );

  return {
    user,
    isLoading,
  };
};

export const useUserBookings = () => {
  const getCurrentUserBookingsRequest = async (): Promise<AllHotels> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    return response.json();
  };

  const { data: bookings, isLoading } = useQuery(
    'getUserBookings',
    getCurrentUserBookingsRequest,
    {
      retry: false,
    }
  );

  return {
    bookings,
    isLoading,
  };
};
