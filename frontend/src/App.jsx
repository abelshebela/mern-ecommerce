import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PrivateRoute from './components/PrivateRoute';
import VerificationBanner from './components/VerificationBanner';

import VerificationNotice from './pages/VerificationNotice';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {
  return (
    <Router>
      <VerificationBanner />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verification-notice" element={<VerificationNotice />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          
          {/* Protected Routes */}
          <Route path="" element={<PrivateRoute />}>
             <Route path="/shipping" element={<Checkout />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
