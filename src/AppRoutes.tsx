import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Layout>
            <span>Home Page</span>
          </Layout>
        }
      />
      <Route
        path='/search'
        element={
          <Layout>
            <span>Search Page</span>
          </Layout>
        }
      />

      <Route
        path='/register'
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />

      <Route
        path='/sign-in'
        element={
          <Layout>
            <SignIn />
          </Layout>
        }
      />

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
