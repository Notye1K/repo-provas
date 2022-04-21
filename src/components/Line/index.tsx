import Container from './style'

export default function Line(props: {or?: string}) {

    return props.or ? (
        <Container>
            <div className="line" /> <span className="or">ou</span> <div className="line" />
        </Container>
    ) : (
        <Container>
            <div className="line" />
        </Container>
    )
}