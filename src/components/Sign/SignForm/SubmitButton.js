import styled from 'styled-components'

const SubmitButton = styled.button`
    display: block;
    font-size: 16px;
    text-align: center;
    line-height: 44px;
    box-shadow: 0 3px 15px rgba(255, 69, 0, 0.5);
    color: #fff;
    border: none;
    background: #FF4500;
    width: 100%;
    border-radius: 4px;
    &:active{
        background-color: #FFA27F;
    }
`

export default SubmitButton