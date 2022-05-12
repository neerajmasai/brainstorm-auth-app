import './App.css';
import Container from './Components/Container/Container';
import { AuthContextProvider } from './Components/Context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Container />
      </AuthContextProvider>
    </div>
  );
}

export default App;
