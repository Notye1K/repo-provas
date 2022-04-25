import styled from 'styled-components'

const Div = styled.div`
    .term,
    .disci {
        font-family: 'Poppins', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
    }
    .category {
        font-family: 'Poppins', sans-serif;
        line-height: 24px;
        font-weight: 400;
    }
    .test {
        color: gray;
        &:hover {
            color: #6a6ad7;
        }
    }
    .empty {
        display: flex;
        justify-content: center;

        margin-top: 2em;

        font-size: 3em;
    }
    a {
        text-decoration: none;
    }

    @media (max-width: 500px) {
        .empty{
            font-size: 18px;
        }
    }
`

export default Div
