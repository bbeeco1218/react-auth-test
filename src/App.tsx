import './App.css';
import useAuth from './hooks/useAuth';
import LoginScreen from './pages/login';
import LoginSuccessScreen from './pages/loginSuccess';

function App() {
  const { auth } = useAuth();
  return auth.isLoggedIn ? <LoginSuccessScreen /> : <LoginScreen />;
}

export default App;
