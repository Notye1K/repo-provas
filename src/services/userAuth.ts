import { Form } from '../components/LoginRegisterBox'
import axios from 'axios'

import api from './apiUrl'

type Body = Omit<Form, 'confirmPassword'>

export function register(data: Body) {
    const promise = axios.post(api + `/register`, data)
    return promise
}

export function login(data: Body) {
    const promise = axios.post(api + `/login`, data)
    return promise
}

export function loginGit(code: string) {
    const promise = axios.post(api + '/login/github', {
        code,
    })
    return promise
}
