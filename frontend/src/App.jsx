// /src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import AddBook from './pages/AddBook';
import Skills from './pages/Skills';
import SkillDetail from './pages/SkillDetail';
import OfferSkill from './pages/OfferSkill';
import Contact from './pages/Contact';
import ContactSeller from './pages/ContactSeller';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="books" element={<Books />} />
        <Route path="books/:id" element={<BookDetail />} />
        <Route path="books/add" element={<AddBook />} />
        <Route path="contact-seller/:id" element={<ContactSeller />} />
        <Route path="skills" element={<Skills />} />
        <Route path="skills/:id" element={<SkillDetail />} />
        <Route path="skills/offer" element={<OfferSkill />} />
        <Route path="contact/:id" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-otp" element={<VerifyOTP />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}
