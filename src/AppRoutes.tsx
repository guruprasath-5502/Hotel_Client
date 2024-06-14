import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import ProtectedRoute from './auth/ProtectedRoute';
import AddHotel from './pages/AddHotel';
import MyHotels from './pages/MyHotels';

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

      <Route element={<ProtectedRoute />}>
        <Route
          path='/my-hotels'
          element={
            <Layout>
              <MyHotels />
            </Layout>
          }
        />
        <Route
          path='/add-hotel'
          element={
            <Layout>
              <AddHotel />
            </Layout>
          }
        />
      </Route>

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
