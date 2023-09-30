// import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerRouters from "./routers/CustomerRouters";
import "./styles.css";

function App() {
  return (
    <main className="relative">
      <Routes>
        <Route path="/*" element={<CustomerRouters />}></Route>
      </Routes>
    </main>
  );
}

export default App;
