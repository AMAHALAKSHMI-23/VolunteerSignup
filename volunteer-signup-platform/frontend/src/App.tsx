import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeProvider, useTheme } from './context/ThemeContext';



const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

const AppContent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white`}>
      <Navbar />
      <main className="p-4">
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-300 dark:bg-gray-700 rounded mb-4"
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <Outlet />
      </main>
    </div>
  );
};

export default App;

