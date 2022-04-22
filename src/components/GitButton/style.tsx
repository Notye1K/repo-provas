import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    .gitButton {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 464px;
        height: 36px;
        background: #424445;
        margin-top: 31px;
        margin-bottom: 29px;
        color: white;
        box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
            0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12);
        border-radius: 4px;

        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 0.4px;
        text-transform: uppercase;

        &:hover {
            background: #777b7d;
        }
    }
`

export default Container
