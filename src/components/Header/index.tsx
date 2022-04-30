import Logo from '../Logo'
import logout from '../../assets/logout.svg'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material'
import Container from './style'
import Line from '../Line'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Header({
    text,
    search,
}: {
    text: string
    search: Function
}) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const navigate = useNavigate()
    function clickLogout() {
        handleClose()
        localStorage.removeItem('token')
        navigate('/')
    }

    function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setValue(e.target.value)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter') {
            search(value, text)
        }
    }

    return (
        <>
            <Container>
                <div className="topDiv">
                    <Logo />
                    <img
                        className="logout"
                        src={logout}
                        alt="logout"
                        onClick={handleClickOpen}
                    />
                </div>
                <div className="bottomDiv">
                    {text === 'Create' ? (
                        <Typography variant="h6">Adicione uma prova</Typography>
                    ) : (
                        <TextField
                            id="ioutlned-basic"
                            label={`Pesquise por ${text}`}
                            variant="outlined"
                            className="input"
                            onChange={handleInput}
                            value={value}
                            onKeyDown={handleKeyDown}
                        />
                    )}
                </div>
            </Container>
            <Line />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Tem certeza que quer sair?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Não</Button>
                    <Button onClick={clickLogout} autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
