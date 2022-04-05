import React from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/users/Registers';
import Login from './pages/users/Login';
import AddSales from './pages/sales/addSales';
import AddExpense from './pages/expense/addExpense';
import Profile from './pages/users/Profile';
import Navbar from './components/Navigation/Navbar';
import ProtectedRoute from './components/Navigation/ProtectedRoutes';
import NotAdmin from './components/NotAdmin';
import AdminRoute from './components/Navigation/AdminRoute';
import ExpensesList from './pages/expense/ExpenseList';
import EditExpense from './pages/expense/EditExpense';
import SalesList from './pages/sales/salesList';
import EditSale from './pages/sales/editSales';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/not-found" element={<NotAdmin />} />
          <Route
            path="/dashboard"
            element={
              <AdminRoute>
                <Profile />
              </AdminRoute>
            }
          />
          <Route
            path="/add-sale"
            element={
              <ProtectedRoute>
                <AddSales />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sales"
            element={
              <ProtectedRoute>
                <SalesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-sale"
            element={
              <ProtectedRoute>
                <EditSale />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-expense"
            element={
              <ProtectedRoute>
                <EditExpense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <ExpensesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-expense"
            element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
