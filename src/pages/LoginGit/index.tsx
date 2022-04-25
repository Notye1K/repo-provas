import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { loginGit } from '../../services/userAuth'

export default function LoginGit() {
    const { search } = useLocation()
    const query = React.useMemo(() => new URLSearchParams(search), [search])
    const code = query.get('code') as string

    const navigate = useNavigate()
    let c = 0
    useEffect(() => {
        if (code && c < 1) {
            c++
            loginGit(code)
                .then((response) => {
                    localStorage.setItem('token', response.data)
                    navigate('/tests')
                })
                .catch((error) => {
                    alert('falha')
                    navigate('/')
                })
        }
    }, [])

    return <>Carregando ...</>
}
