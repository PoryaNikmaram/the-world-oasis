import GlobalStyle from './styles/GlobalStyles'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Account from './pages/Account'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import Settings from './pages/Settings'
import Users from './pages/Users'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Booking from './pages/Booking'
import Checkin from './pages/Checkin'

import AppLayout from './ui/AppLayout'
import ProtectedRoute from './ui/ProtectedRoute'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from 'react-hot-toast'
import { DarkModeProvider } from './contexts/DarkModeToggle'

const queryClient = new QueryClient({})

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:bookingId" element={<Booking />} />
              <Route path="/checkin/:bookingId" element={<Checkin />} />
              <Route path="/cabins" element={<Cabins />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<Users />} />
              <Route path="/account" element={<Account />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="bottom-right"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 3000,
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App