import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginRegisterBox from '../../components/LoginRegisterBox'
import Logo from '../../components/Logo/index'

export default function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) navigate('/tests')
    },[])

    return (
        <>
            <Logo />

            <LoginRegisterBox type="login" />
        </>
    )
}
