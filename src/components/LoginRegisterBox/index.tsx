import {
    Alert,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,
    TextField,
} from '@mui/material'
import React, { useState } from 'react'
import GitButton from '../../components/GitButton'
import Line from '../../components/Line'
import Container from './style'
import { VisibilityOffSharp, VisibilitySharp } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { login, register } from '../../services/userAuth'
import { LoadingButton } from '@mui/lab'

export interface Form {
    email: string
    password: string
    confirmPassword: string
}

export default function LoginRegisterBox({ type }: { type: string }) {
    const title = type === 'login' ? 'Login' : 'Cadastro'
    const spanText =
        type === 'login' ? 'Não possuo cadastro' : 'Já possuo cadastro'
    const buttonText = type === 'login' ? 'ENTRAR' : 'CADASTRAR'
    const link = type === 'login' ? 'register' : ''

    const navigate = useNavigate()

    const [form, setForm] = useState<Form>({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMesage] = useState('Erro')

    const [loading, setLoading] = useState(false)

    function handleClickSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setLoading(true)

        const { confirmPassword, ...rest } = form
        if (type === 'login') {
            tryLogin(rest)
        } else {
            const match = checkPasswords(form.password, form.confirmPassword)
            if (!match) {
                setLoading(false)
                return
            }

            tryRegister(rest)
        }
    }

    function tryRegister(rest: { email: string; password: string }) {
        const promise = register(rest)
        promise
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                setOpen(true)
                setErrorMesage(error.response?.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function tryLogin(rest: { email: string; password: string }) {
        const promise = login(rest)
        promise
            .then((response) => {
                localStorage.setItem('token', response.data)
                navigate('/tests')
            })
            .catch((error) => {
                setOpen(true)
                setErrorMesage(error.response?.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function checkPasswords(password: string, confirmPassword: string) {
        if (password !== confirmPassword) {
            setError(true)
            setMessage('Suas senhas precisam ser iguais')
            return false
        } else {
            setError(false)
            setMessage('')
            return true
        }
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <Container>
            <div className="title">{title}</div>
            <GitButton />

            <Line or={'ou'} />

            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>

            <form onSubmit={handleClickSubmit}>
                {type === 'login' ? (
                    <Login form={form} setForm={setForm} />
                ) : (
                    <Register
                        form={form}
                        setForm={setForm}
                        error={error}
                        message={message}
                    />
                )}

                <div className="bottomDiv">
                    <Link to={`/${link}`}>
                        <span>{spanText}</span>
                    </Link>

                    <LoadingButton
                        size="small"
                        type="submit"
                        loading={loading}
                        variant="outlined"
                    >
                        {buttonText}
                    </LoadingButton>
                </div>
            </form>
        </Container>
    )
}

function Login({
    form,
    setForm,
}: {
    form: Form
    setForm: React.Dispatch<React.SetStateAction<Form>>
}) {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <>
            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                value={form.email}
                onChange={handleOnChange}
                name="email"
                required
                className="input"
            />
            <FormControl variant="outlined" margin="normal" className="input">
                <InputLabel htmlFor="outlined-adornment-password">
                    Senha
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOffSharp />
                                ) : (
                                    <VisibilitySharp />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Senha"
                    value={form.password}
                    onChange={handleOnChange}
                    name="password"
                    required
                />
            </FormControl>
        </>
    )
}

function Register({
    form,
    setForm,
    error,
    message,
}: {
    form: Form
    setForm: React.Dispatch<React.SetStateAction<Form>>
    error: boolean
    message: string
}) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleClickShowConfimPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    return (
        <>
            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                margin="normal"
                value={form.email}
                onChange={handleOnChange}
                name="email"
                required
                className="input"
            />
            <FormControl variant="outlined" margin="normal" className="input">
                <InputLabel htmlFor="outlined-adornment-password">
                    Senha
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOffSharp />
                                ) : (
                                    <VisibilitySharp />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Senha"
                    value={form.password}
                    onChange={handleOnChange}
                    name="password"
                    required
                    error={error}
                />
                <FormHelperText error={error} id="accountId-error">
                    {message}
                </FormHelperText>
            </FormControl>
            <FormControl variant="outlined" margin="normal" className="input">
                <InputLabel htmlFor="outlined-adornment-password">
                    Confirme sua senha
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfimPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showConfirmPassword ? (
                                    <VisibilityOffSharp />
                                ) : (
                                    <VisibilitySharp />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Confirme sua senha"
                    value={form.confirmPassword}
                    onChange={handleOnChange}
                    name="confirmPassword"
                    required
                    error={error}
                />
                <FormHelperText error={error} id="accountId-error">
                    {message}
                </FormHelperText>
            </FormControl>
        </>
    )
}
