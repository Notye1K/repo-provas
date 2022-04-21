import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { useState } from 'react'
import GitButton from '../../components/GitButton'
import Line from '../../components/Line'
import Container from './style'
import { VisibilityOffSharp, VisibilitySharp } from '@mui/icons-material'
import { Link } from 'react-router-dom'


export default function LoginRegisterBox({ type }: { type: string }) {


    const title = type === 'login' ? 'Login' : 'Cadastro'

    const fields = type === 'login' ? <Login/> : <Register/>

    const spanText = type === 'login' ? 'Não possuo cadastro' : 'Já possuo cadastro'

    const buttonText = type === 'login' ? 'ENTRAR' : 'CADASTRAR'

    const link = type === 'login' ? 'register' : ''

    return (
        <Container>
            <div className="title">{title}</div>
            <GitButton />

            <Line or={'ou'} />

            {fields}

            <div className="bottomDiv">
                <Link to={`/${link}`}>
                    <span>{spanText}</span>
                </Link>

                <Button variant="contained">{buttonText}</Button>
            </div>
        </Container>
    )
}

function Login () {
    const [showPassword, setShowPassword] = useState(false)

     const handleClickShowPassword = () => {
         setShowPassword(!showPassword)
     }

     const handleMouseDownPassword = (
         event: React.MouseEvent<HTMLButtonElement>
     ) => {
         event.preventDefault()
     }

    return (
        <>
            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
            />
            <FormControl variant="outlined" margin="normal">
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
                />
            </FormControl>
        </>
    )
}

function Register() {
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }
    return (
        <>
            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                margin="normal"
            />
            <FormControl variant="outlined" margin="normal">
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
                />
            </FormControl>
            <FormControl variant="outlined" margin="normal">
                <InputLabel htmlFor="outlined-adornment-password">
                    Confirme sua senha
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
                    label="Confirme sua senha"
                />
            </FormControl>
        </>
    )
}