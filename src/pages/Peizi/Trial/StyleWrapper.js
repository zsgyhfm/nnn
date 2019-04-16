import styled from "styled-components";
import imgComputer from "../../../images/icon-computer.png"
const StyleWrapper = styled.div`
    position: relative;
    margin-top: 10px;
    margin-bottom: 40px;
    .top{
        margin: 20px 0;
        position: relative;
        background-color: #FF7C00;
        border-radius: 0.4rem;
        height: 0.8rem;
        font-size: 0.3733rem;
        line-height: 0.8rem;
        color: #fff; 
        text-align: center;

        &::before{
            content: "";
            position: absolute;
            height: 1.0667rem;
            width: 1.0667rem;
            left: -8px;
            top: 50%;
            margin-top: -0.5333rem;
            background:#FF8A00 url(${imgComputer}) no-repeat center center;
            background-size: 60%;
            border-radius: 50%; 
        }
    }

    .lists {
        position: relative;
        &::before{
            position: absolute;
            content: "";
            width: 2px;
            height: 90%;
            left: 12px;
            top: -10px;
            background-color: #FF8E01;
        }
        margin-bottom: 30px;
        .item {
            position: relative;
            margin: 10px 0;
            .order-list{
                position: absolute;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                color: #fff;
                text-align: center;
                line-height: 10px;
                background-color: #FF8E01;
                left: 0;
                top: 50%;
                margin-top: -10px;
                border: 4px solid #F5F5F9;
            }
            .bubble-box {
                font-size: 15px;
                margin-left: 40px;
                padding: 16px 20px;
                position: relative;
                box-sizing: border-box;
                background: #fff;
                color: #252525;
                border-radius: 5px;
                filter: drop-shadow(0 0 1px #e8e8e8);
           
                &::before {
                    content: "";
                    position: absolute;
                    width: 0;
                    height: 0;
                    left: 0px;
                    top: 50%;
                    margin-top: -6px;
                    box-sizing: border-box;
                    border: 5px solid black;
                    border-color: transparent transparent #fff #fff;
                    transform-origin: 0 0;
                    transform: rotate(45deg);
                }     
                a{
                    display: inline-block;
                    color: #fff;
                    font-size: 13px;
                    border-radius: 3px;
                    background-color: #FF8F00;
                    padding: 0 8px;
                    margin-right: 3px;
                }
                .text-warnning {
                    color: #FF8F00;
                }
            }
        }
    }
`;

export default StyleWrapper;
