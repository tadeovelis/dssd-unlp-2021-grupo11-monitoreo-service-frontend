import logo from './logo.svg';
import './App.css';
import AppRoutes from './AppRoutes';
import { withRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default withRouter(App);
