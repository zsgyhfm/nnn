import React from 'react'
import styled from 'styled-components'

const StyleWrapper = styled.tr`
    td {
        padding: 10px 0;
        line-height: 30px !important;
        border-bottom: 1px solid #E8E8E8;
    }
`

const UserItem = ({time, username,endTime})  => {
    return (
        <StyleWrapper>
            <td>{username}</td>
            <td>{time}</td>
            <td>{endTime}</td>
        </StyleWrapper>
    )
}
export default UserItem