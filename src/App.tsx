import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import LoginGit from './pages/LoginGit'
import Register from './pages/Register'
import Tests from './pages/Tests'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/login/github" element={<LoginGit/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
