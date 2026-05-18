import { useState } from 'react'
import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import './App.css'
import Register from './pages/Register';
import SendVerifyEmail from './pages/SendVerifyEmail';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import useUser from './hook/useUser';
// import Header from './components/Header';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import AddPaymentMethodPage from './pages/AddPaymentMethodPage';
import MainPymentMethodPage from './pages/MainPymentMethodPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import CpanelPage from './pages/CpanelPage';
import ProfilePage from './pages/ProfilePage';
// admin pages
import AdminUsers from './pages/admin/AdminUsers';
import AdminLayout from './pages/layouts/AdminLayout';
import AdminMethods from './pages/admin/AdminMethods';
import AdminSites from './pages/admin/AdminSites';
import MainLayout from './pages/layouts/MainLayout';
import AdminContects from './pages/admin/AdminContects';

function App() {

  const { user } = useUser()
  console.log(user?.userName)
  console.log(user?.email)
  console.log(user?.profilePic)
  console.log(user?.role)
  return (
    <>
      <Routes>

        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/method" element={<AddPaymentMethodPage />} />
          <Route path="/payment-method" element={<MainPymentMethodPage />} />
          <Route path="/success" element={<PaymentSuccessPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cpanel" element={<CpanelPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/send-verify-email" element={<SendVerifyEmail />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

        </Route>



        {/* ADMIN LAYOUT */}
        <Route path="dashboard" element={<AdminLayout />}>

          {/* /admin/users */}
          <Route path="users" element={<AdminUsers />} />

          {/* /admin/sites */}
          <Route path="sites" element={<AdminSites />} />

          {/* /admin/methods */}
          <Route path="methods" element={<AdminMethods />} />

          <Route path="contects" element={<AdminContects />} />

        </Route>


        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
