import Logo from '../Logo'
import logout from '../../assets/logout.svg'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    TextField,
} from '@mui/material'
import Container from './style'
import Line from '../Line'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Header({ text }: { text: string }) {
    const [open, setOpen] = useState(false)

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
                    <TextField
                        id="ioutlned-basic"
                        label={`Pesquise por ${text}`}
                        variant="outlined"
                        className="input"
                    />
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
