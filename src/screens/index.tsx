import {NativeRouter, Route, Routes} from 'react-router-native';
import RegisterScreen from './register';
import LoginScreen from './login';

const Screens = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<RegisterScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </NativeRouter>
  );
};

export default Screens;
