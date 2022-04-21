import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 5px;

    .line {
        width: 100%;
        height: 1px;
        border: 1px solid #c4c4c4;
    }

    .or {
        margin: 0 5px;

        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 24px;
        letter-spacing: 0.15px;
        color: rgba(0, 0, 0, 0.8);
    }
`

export default Container