// import logo from './logo.svg';
import './App.css';
import "./styles.css";
import { Route, Routes } from 'react-router-dom';
import CustomerRouters from './routers/CustomerRouters';

function App() {
  return (
    <main className="relative">
      <Routes>
        <Route path='/*' element={<CustomerRouters/>}>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
