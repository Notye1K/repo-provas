import styled from 'styled-components'

const Container = styled.div`
    width: 464px;
    height: 328px;
    margin: 0 auto;
    margin-top: 238px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: 'Poppins', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 0.15px;
        color: rgba(0, 0, 0, 0.8);
    }

    .input {
        width: 100%;
    }

    .bottomDiv {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-top: 10px;

        span {
            font-family: 'Poppins', sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 24px;
            letter-spacing: 0.15px;
            text-decoration-line: underline;
            color: rgba(70, 115, 202, 0.8);
        }
    }
`

export default Container
