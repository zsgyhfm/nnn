import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import { Icon } from "antd-mobile";
import BankList from "./BankList";
import AddBank from "./AddBank";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as api from "api";
import axios from "axios";
import { Modal, Toast } from "antd-mobile";

const pageTitle = "银行卡列表";
const alert = Modal.alert;

class Bank extends PureComponent {
    state = {
        bankList: [],
        bankKeys: []
    };

    componentDidMount() {
        this._fetchBankList();
    }

    _fetchBankList = () => {
        const { token } = this.props;
        axios.post(`${api.BANK_LIST}`, { token }).then(res => {
            if (res.data.status === "1") {
                this.setState({
                    bankList: res.data.data.banks,
                    bankKeys: res.data.data.bank
                });
            }
        });
    };

    onDeleteCard = id => {
        alert("删除此银行卡", "确认删除此银行卡吗？", [
            { text: "取消", onPress: null, style: "default" },
            { text: "确认", onPress: () => this._deleteCard(id) }
        ]);
    };

    _deleteCard = id => {
        const { token } = this.props;
        axios.post(`${api.DELETE_BANK}`, { token, id }).then(res => {
            if (res.data.status === "1") {
                this._fetchBankList();
            } else {
                Toast.info(res.data.message);
            }
        });
    };

    render() {
        const { bankList, bankKeys } = this.state;
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={
                            <Link to="/member/profile/index">
                                <Icon
                                    type="left"
                                    style={{ width: "30px", height: "30px" }}
                                />
                            </Link>
                        }
                    >
                        {pageTitle}
                    </NavBar>
                    <BankList
                        lists={bankList}
                        bankKeys={bankKeys}
                        deleteCard={this.onDeleteCard}
                    />
                    <AddBank to="/member/profile/bank/add">
                        <Icon type="cross" /> 点击添加新银行卡
                    </AddBank>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});

export default connect(mapStateToProps)(Bank);
