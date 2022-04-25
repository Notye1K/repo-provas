import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .topDiv {
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .logout {
            cursor: pointer;
        }
    }
    .bottomDiv {
        width: 100%;
        margin-top: 3em;
        margin-bottom: 2em;

        display: flex;
        justify-content: center;
    }
    .input {
        width: 50%;
    }

    @media (max-width: 500px) {
        .logout{
            width: 20px;
        }
    }
`

export default Container
