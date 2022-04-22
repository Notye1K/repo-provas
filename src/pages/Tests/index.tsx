import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Tests() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/')
    })

    return <>als</>
}
