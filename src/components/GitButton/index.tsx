import { Button } from '@mui/material'
import Container from './style'

export default function GitButton() {
    return (
        <Container>
            <Button className="gitButton">
                <a href="https://github.com/login/oauth/authorize?client_id=da6cca9191e6967a9724">
                    Entrar com o GITHUB
                </a>
            </Button>
        </Container>
    )
}
