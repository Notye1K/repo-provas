import logo from '../../assets/logo.svg'
import Container from './style'

export default function Logo() {
    return (
        <Container>
            <img src={logo} alt="logo" />
            <span className="repo">Repo</span>{' '}
            <span className="provas">Provas</span>
        </Container>
    )
}
