import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom';
import TransactionAdding from './pages/TransactionAdding';
import TransactionHistory from './pages/TransactionHistory';

function App() {
  return (
    <div className="app-wrapper">
      <nav className="app-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/history">History</NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<TransactionAdding />} />
        <Route path='/history' element={<TransactionHistory />} />
      </Routes>
    </div>
  )
}

export default App
