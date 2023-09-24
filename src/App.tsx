import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const route = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={route} />
    </ErrorBoundary>
  );
}

export default App;
