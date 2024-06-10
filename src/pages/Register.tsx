import { useRegisterUser } from '@/api/UserApi';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const { registerUser } = useRegisterUser();

  const onSubmit = handleSubmit((data) => {
    registerUser(data);
  });

  return (
    <form className='flex flex-col gap-5 p-5' onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Create an Account</h2>
      <div className='flex flex-col md:flex-row gap-5'>
        <label className='text-gray-700 text-sm font-bold flex-1'>
          First Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('firstName', { required: 'This field is required' })}
          />
          {errors.firstName && (
            <span className='text-red-500'>{errors.firstName.message}</span>
          )}
        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
          Last Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('lastName', { required: 'This field is required' })}
          />
          {errors.lastName && (
            <span className='text-red-500'>{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Confirm Password
        <input
          type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('confirmPassword', {
            validate: (value) => {
              if (!value) {
                return 'This field is required';
              } else if (watch('password') != value) {
                return 'Password do not match';
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className='text-red-500'>{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <Button
          color='blue'
          type='submit'
          className='bg-blue-700 text-white font-bold text-xl hover:bg-blue-600 flex items-center'
        >
          Create Account
        </Button>
      </span>
    </form>
  );
};

export default Register;