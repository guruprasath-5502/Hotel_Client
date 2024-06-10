import { useSignInUser } from '@/api/UserApi';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export type SignInFormData = { email: string; password: string };

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const { signInUser, isLoading } = useSignInUser();

  const onSubmit = handleSubmit((data) => {
    signInUser(data);
  });

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Sign In</h2>

      <label className='text-gray-700 text-sm font-bold flex-1'>
        Email
        <input
          type='email'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('email', { required: 'This field is required' })}
        />
        {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
        )}
      </label>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Password
        <input
          type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className='text-red-500'>{errors.password.message}</span>
        )}
      </label>
      <span className='flex items-center justify-between'>
        <span className='text-sm'>
          Not Registered?{' '}
          <Link className='underline' to='/register'>
            Create an account here
          </Link>
        </span>
        <Button
          color='blue'
          type='submit'
          className='bg-blue-700 text-white font-bold text-xl hover:bg-blue-600 '
        >
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Sign In
        </Button>
      </span>
    </form>
  );
};

export default SignIn;
