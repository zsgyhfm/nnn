import React from "react";
import styled from "styled-components";
const StyleWrapper = styled.article`
    min-height: calc(100% - 45px);
    background-color: #fff;
    .hd {
        padding: 15px 15px 5px;
        border-bottom: 1px solid #e8e8e8;
            text-align: center;
        .title{
            line-height: 1.2;
            font-size: 16px;
            color: #252525;
        }
        .date{
            color: #8E8E93;
            padding: 5px 0;
        }
    }
    main {
        padding: 10px 15px;
    }
    img{
        width:100%;
    }
`;

const Article = ({ title, date, showDate, children }) => {
    return (
        <StyleWrapper>
            <div className="hd">
                <div className="title">{title}</div>
                {showDate ? <div className="date">{date}</div> : null}
                
            </div>
            <main dangerouslySetInnerHTML={children}></main>
        </StyleWrapper>
    );
};

export default Article;
