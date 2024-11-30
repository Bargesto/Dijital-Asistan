import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Welcome from './components/Welcome'
import Dashboard from './components/Dashboard'
import './index.css'

function App() {
  const [userName, setUserName] = useState<string | null>(localStorage.getItem('userName'))

  const handleWelcomeSubmit = (name: string) => {
    setUserName(name)
    localStorage.setItem('userName', name)
  }

  const handleNameChange = (newName: string) => {
    setUserName(newName)
    localStorage.setItem('userName', newName)
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route 
            path="/" 
            element={
              userName ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Welcome onNameSubmit={handleWelcomeSubmit} />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              userName ? (
                <Dashboard 
                  userName={userName} 
                  onNameChange={handleNameChange}
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App