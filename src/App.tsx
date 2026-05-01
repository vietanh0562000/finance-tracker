import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import TransactionAdding from './pages/TransactionAdding';
import TransactionHistory from './pages/TransactionHistory';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/history">History</Link>
      </nav>
      <Routes>
        <Route path='/' element={<TransactionAdding/>}></Route>
        <Route path='/history' element={<TransactionHistory/>}></Route>
      </Routes>
    </div>
  )
}

export default App
