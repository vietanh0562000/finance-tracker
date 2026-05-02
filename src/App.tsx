import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom';
import TransactionAdding from './pages/TransactionAdding';
import TransactionHistory from './pages/TransactionHistory';
import TransactionSummary from './pages/TransactionSummary';

function App() {
  return (
    <div className="app-wrapper">
      <nav className="app-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/summary">Summary</NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<TransactionAdding />} />
        <Route path='/history' element={<TransactionHistory />} />
        <Route path='/summary' element={<TransactionSummary />} />
      </Routes>
    </div>
  )
}

export default App
