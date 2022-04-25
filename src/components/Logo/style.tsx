import styled from 'styled-components'

const Container = styled.div`
    margin-top: 3%;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
        margin-right: 10.5px;
    }

    span {
        font-family: 'Lexend', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 2.5em;
        line-height: 2em;
        color: #000000;
    }
    .provas {
        color: #3f61d7;
    }

    @media (max-width: 500px) {
        img{
            width: 10%;
        }
        span{
            font-size: 1.5em;
        }
    }
    
`

export default Container
