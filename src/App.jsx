import { createContext } from 'react'
import { useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { authReducer, initialState } from './store/authReduceur'

export const AuthContext = createContext()

function App() {
  const [ state, dispatch ] = useReducer(authReducer, initialState)
  return (
    <div>
      <AuthContext.Provider value={{state, dispatch}}>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
      </AuthContext.Provider>
      
    </div>
  )
}

export default App
