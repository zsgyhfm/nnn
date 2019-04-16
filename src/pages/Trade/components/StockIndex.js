import React, { Component } from "react";
import styled from "styled-components";
import StockColorText from "components/Text/StockColorText";
import axios from "axios";
import { connect } from "react-redux";
import { default as stockIndexAction } from "actions/stockIndex";
import * as api from "api";
import round from 'lodash/round'


const StyleWrapper = styled.div`
    display: flex;
    background-color: #fff;
    padding: 10px 0;
`;

class StockIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stockIndex: props.stockIndex
        };
    }
    componentDidMount() {
        this._fetchData();
    }
    _fetchData = () => {
        const { dispatchStockIndex, token } = this.props;
        axios
            .post(`${api.QUERY_STOCKS}?code=sh000001,399001,399006`, { token },{ headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }})
            .then(res => {
                dispatchStockIndex(res.data.data, () => {
                    this.setState({
                        stockIndex: res.data.data
                    });
                });
                
            });
    };
    render() {
        const { stockIndex } = this.state;
        return (
            <StyleWrapper>
                {stockIndex.map(item => (
                    <Item
                        key={item.code}
                        title={item.name}
                        value={ round(item.current_price, 2)}
                        range={round(item.current_price - item.yesterday_price, 2)}
                        rate={round( (item.current_price - item.yesterday_price) / item.yesterday_price * 100, 2)}
                    />
                ))}
            </StyleWrapper>
        );
    }
}
const mapStateToProps = state => ({
    token: state.token,
    stockIndex: state.stockIndex
});

const mapDispatchToProps = dispatch => ({
    dispatchStockIndex: (data, fn) => {
        dispatch(stockIndexAction(data));
        fn && fn();
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockIndex);

const ItemWrapper = styled.div`
    flex: 1;
    padding: 0 10px;

    .title {
        font-size: 14px;
        text-align: center;
    }
    .value {
        text-align: center;
        font-size: 18px;
    }
    .meta {
        display: flex;
        justify-content: space-between;
        div {
            color: #8e8e93;
        }
    }
`;

const Item = ({ title, value, range, rate }) => {
    return (
        <ItemWrapper>
            <div className="title">{title}</div>
            <div className="value">
                <StockColorText base={range}>{value}</StockColorText>
            </div>
            <div className="meta">
                <span><StockColorText base={range}> {range}</StockColorText> </span>
                <span><StockColorText base={range}>{rate}%</StockColorText></span>
            </div>
        </ItemWrapper>
    );
};
