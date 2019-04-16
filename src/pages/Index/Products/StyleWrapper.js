import styled from "styled-components";

const StyleWrapper = styled.div`
    background-color: #fff;
    .product-hd {
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.4267rem;
        padding: 0 15px;
        color: #252525;
        border-bottom: 1px solid #e8e8e8;
    }

    .product-list {
        padding-left: 20px;
    }

    .product-list .item {
        position: relative;
        padding: 10px 0;
        border-bottom: 1px solid #e8e8e8;
        overflow: hidden;
    }
    .product-list .item:last-child{
        border: none;
    }
    .product-list .item .figure {
        float: left;
        width: 1.1067rem;
        height: 1.16rem;
        margin-right: 10px;
        position: relative;
    }
    .product-list .item .figure img {
        width: 100%;
        height: 100%;
    }
    .product-list .item-bd {
        position: relative;
    }

    .product-list .item-bd::after {
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #e8e8e8;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: relative;
        top: -2px;
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 15px;
    }

    .product-list .item-bd .title {
        font-size: 0.3733rem;
        height: 0.6533rem;
        color: #333;
    }

    .product-list .item-bd p {
        color: #999;
    }
`;

export default StyleWrapper