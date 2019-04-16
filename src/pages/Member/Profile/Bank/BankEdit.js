import React, { Component, Fragment } from "react";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Validator from "Validator";
import {
    Icon,
    List,
    InputItem,
    Button,
    WingBlank,
    WhiteSpace,
    Toast
} from "antd-mobile";
import axios from "axios";
import * as api from "api";
import SinglePicker from "./SinglePicker";

const pageTitle = "修改银行卡";

class BankEdit extends Component {
    constructor(props) {
        super(props);
        let area = this._fetchArea(props.token, 1, data => {
            this.setState({
                provinces: data.map(item => ({
                    label: item.name,
                    value: item.id
                }))
            });
        });
        let bank = this._fetchBankList(props.token);
        Promise.all([area, bank]).then(() =>
            this._fetchCardInfo(props.token, props.match.params.id)
        );
    }

    state = {
        realName: "",
        bankKeys: [],
        selectedBank: "",
        provinces: [],
        selectedProvince: "",
        cities: [],
        selectedCity: "",
        branch: "",
        card: ""
    };

    onSelectBank = item => {
        this.setState({
            selectedBank: item[0]
        });
    };

    onSelectProvince = item => {
        this.setState({
            selectedProvince: item[0]
        });

        this._fetchArea(this.props.token, item[0], data => {
            this.setState({
                cities: data.map(item => ({
                    label: item.name,
                    value: item.id
                })),
                selectedCity: ""
            });
        });
    };

    onSelectCity = item => {
        this.setState({
            selectedCity: item[0]
        });
    };
    
    handleCardChange = (value) => {
        this.setState({
            card: value
        })
    }
    handleBranchChange = (value) => {
        this.setState({
            branch: value
        })
    }
    onSubmit = () => {
        const { history, token, match } = this.props;
        const {
            selectedProvince: province,
            selectedCity: city,
            selectedBank: bank,
            branch,
            card
        } = this.state;

        const cardValue = card.replace(/\s/g, '');
        if (!this._validateForm({ bank, card: cardValue, province, city, branch }))
            return false;

        axios
            .post(`${api.BANK_EDIT}`, {
                token,
                id: match.params.id,
                bank,
                card,
                province,
                city,
                branch
            })
            .then(res => {
                if (res.data.status === "1") {
                    Toast.success("修改成功", 1, () => {
                        history.push("/member/profile/bank/index");
                    });
                } else {
                }
            });
    };

    _validateForm({ bank, card, province, city, branch }) {
        
        if (bank === "") {
            Toast.info("请选择银行", 1, null, false);
            return false;
        }
        if (!Validator.bankCard(card)) {
            Toast.info("请确认银行卡号", 1, null, false);
            return false;
        }
        if (province === "") {
            Toast.info("请选择开户行省份", 1, null, false);
            return false;
        }
        if (city === "") {
            Toast.info("请选择开户行城市", 1, null, false);
            return false;
        }
        if (branch === "") {
            Toast.info("请输入开户支行名称", 1, null, false);
            return false;
        }
        return true;
    }

    render() {
        const {
            selectedBank,
            bankKeys,
            provinces,
            selectedProvince,
            cities,
            selectedCity,
            realName,
            branch,
            card
        } = this.state;
        
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={
                            <Icon
                                type="left"
                                style={{ width: "30px", height: "30px" }}
                            />
                        }
                        onLeftClick={() => window.history.go(-1)}
                    >
                        {pageTitle}
                    </NavBar>
                    <List>
                        <List.Item extra={realName}>开户人</List.Item>
                        <SinglePicker
                            selected={selectedBank}
                            options={bankKeys}
                            onSelectItem={this.onSelectBank}
                        >
                            <List.Item arrow="horizontal">选择银行</List.Item>
                        </SinglePicker>
                        <InputItem
                            style={{ textAlign: "right" }}
                            value={card}
                            type="bankCard"
                            onChange={this.handleCardChange}

                        >
                            银行卡号
                        </InputItem>

                        <SinglePicker
                            selected={selectedProvince}
                            options={provinces}
                            onSelectItem={this.onSelectProvince}
                        >
                            <List.Item arrow="horizontal">开户所在省</List.Item>
                        </SinglePicker>

                        <SinglePicker
                            selected={selectedCity}
                            options={cities}
                            onSelectItem={this.onSelectCity}
                        >
                            <List.Item arrow="horizontal">开户所在市</List.Item>
                        </SinglePicker>

                        <InputItem
                            style={{ textAlign: "right" }}
                            value={branch}
                            onChange={this.handleBranchChange}
                        >
                            支行名称
                        </InputItem>
                    </List>
                    <WhiteSpace size="xl" />
                    <WingBlank>
                        <Button
                            type="primary"
                            style={{ background: "#FF4500" }}
                            onClick={this.onSubmit}
                        >
                            确认修改
                        </Button>
                    </WingBlank>
                </Fragment>
            </DocumentTitle>
        );
    }
    _fetchArea(token, reid = 1, fn) {
        return axios.post(`${api.GET_AREA}`, { token, reid }).then(res => {
            if (res.data.status === "1") {
                fn(res.data.data);
            }
        });
    }

    _fetchBankList = token => {
        return axios.post(`${api.BANK_LIST}`, { token }).then(res => {
            if (res.data.status === "1") {
                this.setState({
                    bankKeys: res.data.data.bank.map(item => ({
                        label: item.name,
                        value: item.id
                    }))
                });
            }
        });
    };

    _fetchCardInfo = (token, id) => {
        axios.post(`${api.BANK_CARD_INFO}`, { token, id }).then(res => {
            if (res.data.status === "1") {
                const { name, bankinfo } = res.data.data;

                this.setState({
                    realName: name,
                    selectedBank: bankinfo.bank_name,
                    selectedProvince: parseInt(bankinfo.provinces_id, 10),
                    selectedCity: parseInt(bankinfo.city_id, 10),
                    branch: bankinfo.branch,
                    card: bankinfo.card
                });

                this._fetchArea(
                    token,
                    parseInt(bankinfo.provinces_id, 10),
                    data => {
                        this.setState({
                            cities: data.map(item => ({
                                label: item.name,
                                value: item.id
                            }))
                        });
                    }
                );
            }
        });
    };
}

const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(BankEdit));
