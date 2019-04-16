import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import {
    fetchSelections,
    addSelection as addSelectionAction,
    deleteSelection as deleteSelectionAction
} from "actions/selection";
const StyleWrapper = styled.div.attrs({
    className: "weui-tabbar weui-tabbar__fixed footer-fixed"
})`
    display: flex;
    .item {
        flex: 1;
        text-align: center;
        height: 1.3333rem;
        line-height: 1.3333rem;
        font-size: 17px;
        color: #252525;
    }
`;

const LinkBtn = styled(Link)`
    display: block;
    background-color: ${props => props.color};
    color: #fff;
`;

class FooterBar extends Component {
    componentDidMount() {
        const { fetchSelections, memberId: uid, token } = this.props;
        if (uid && token) fetchSelections(uid, token);
    }
    toggleSelect = (stock, inSelection) => {
        const {
            memberId,
            token,
            addToSelection,
            deleteFromSelection
        } = this.props;
        inSelection
            ? deleteFromSelection(token, stock.code)
            : addToSelection(token, stock.name, stock.code, memberId);
    };
    render() {
        let inSelection;
        const { stock } = this.props;
        if (!stock) {
            inSelection = false;
        } else {
            inSelection = this.props.selection.some(item => {
                return item.code === stock.code;
            });
        }

        return (
            <StyleWrapper>
                <div
                    className="item"
                    onClick={() => this.toggleSelect(stock, inSelection)}
                >
                    {inSelection ? "取消自选" : "加自选"}
                </div>
                <div className="item">
                    <LinkBtn
                        color="#05AA3B"
                        to={`/trade/sell/${stock ? stock.code : ""}`}
                    >
                        卖出
                    </LinkBtn>
                </div>
                <div className="item">
                    <LinkBtn
                        color="#FF4500"
                        to={`/trade/buy/${stock ? stock.code : ""}`}
                    >
                        买入
                    </LinkBtn>
                </div>
            </StyleWrapper>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token,
    memberId: state.memberId,
    selection: state.selection
});

const mapDispatchToProps = dispatch => ({
    fetchSelections: (uid, token) => {
        dispatch(fetchSelections(uid, token));
    },
    addToSelection: (token, name, code, uid) => {
        dispatch(addSelectionAction(token, name, code, uid));
    },
    deleteFromSelection: (token, code) => {
        dispatch(deleteSelectionAction(token, code));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterBar);
