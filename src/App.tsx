import { Routes, Route, NavLink } from 'react-router-dom';
import { Home, List, Plus, Bell, User } from 'lucide-react';
import TransactionAdding from './pages/TransactionAdding';
import TransactionHistory from './pages/TransactionHistory';
import TransactionSummary from './pages/TransactionSummary';

function NavIcon({ to, icon: Icon }: { to: string; icon: React.ElementType }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
          isActive
            ? 'bg-amber-400/20 text-amber-900'
            : 'text-caramel-500 hover:bg-amber-400/10'
        }`
      }
    >
      <Icon size={22} />
    </NavLink>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50/30 flex flex-col">
      <main className="flex-1 pb-24">
        <div className="max-w-[430px] mx-auto">
          <Routes>
            <Route path="/" element={<TransactionSummary />} />
            <Route path="/add" element={<TransactionAdding />} />
            <Route path="/history" element={<TransactionHistory />} />
          </Routes>
        </div>
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 w-full max-w-[430px] left-1/2 -translate-x-1/2 bg-white border-t border-caramel-500/10 px-6 pt-2 pb-4 flex items-center justify-around z-50">
        <NavIcon to="/" icon={Home} />
        <NavIcon to="/history" icon={List} />

        {/* Center FAB */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `-mt-8 w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-colors ${
              isActive ? 'bg-caramel-500' : 'bg-amber-400 hover:bg-amber-600'
            } text-amber-900`
          }
        >
          <Plus size={28} />
        </NavLink>

        {/* Placeholder nav items */}
        <button className="w-12 h-12 rounded-full flex items-center justify-center text-caramel-500/40 cursor-default">
          <Bell size={22} />
        </button>
        <button className="w-12 h-12 rounded-full flex items-center justify-center text-caramel-500/40 cursor-default">
          <User size={22} />
        </button>
      </nav>
    </div>
  );
}
