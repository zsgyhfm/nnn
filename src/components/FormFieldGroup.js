import React from 'react'
import styled from 'styled-components'

const StyleWrapper = styled.div`
    margin-bottom: 20px;
    &:last-child{
        margin-bottom: 0;
    }
    .title{
        font-size: 16px;
        color: #252525;
        line-height: 30px;
        text-align: center;
        margin: 6px 0;
    }

`

const FormFieldGroup = ({title, children}) => {
    return (
        <StyleWrapper>
            <div className="title">{title}</div>
            {children}
        </StyleWrapper>
    )
}

export default FormFieldGroup