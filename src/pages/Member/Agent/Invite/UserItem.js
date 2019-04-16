import React from 'react'
import styled from 'styled-components'

const StyleWrapper = styled.tr`
    &&& td {
        padding: 5px 0;
        line-height: 30px;
        border-bottom: 1px solid #E8E8E8;
    }
`

const UserItem = ({time, username})  => {
    return (
        <StyleWrapper>
            <td>{username}</td>
            <td>{time}</td>
        </StyleWrapper>
    )
}
export default UserItem