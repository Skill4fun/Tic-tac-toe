import { Routes, Route } from 'react-router-dom';
import './App.scss';
import GameBoard from './components/GameBoard/GameBoard';
import LoginForm from './components/Login/LoginForm';
import Navbar from './components/Navbar/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      // React Router lets us handle client and server-side routing in React applications.
      // It enables the creation of single-page web or mobile apps that allow navigating (Navbar) without refreshing the page.
      <Routes>
        <Route index path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/GameBoard" element={<GameBoard />} />
      </Routes>
    </>
  );
}