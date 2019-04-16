import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
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

const pageTitle = "添加银行卡";

class BankAdd extends PureComponent {
    constructor(props) {
        super(props);
        this.cardRef = React.createRef();
        this.branchRef = React.createRef();

        this._fetchArea(props.token, 1, data => {
            this.setState({
                provinces: data.map(item => ({
                    label: item.name,
                    value: item.id
                }))
            });
        });
        this._fetchUserInfo(props.token);
        this._fetchBankList(props.token);
    }
    state = {
        isAuth: 1,
        realName: "",
        bankKeys: [],
        selectedBank: "",
        provinces: [],
        selectedProvince: "",
        cities: [],
        selectedCity: ""
    };
    componentDidMount() {}

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

    onSubmit = () => {
        const { history, token } = this.props;
        const {
            selectedProvince: province,
            selectedCity: city,
            selectedBank: bank
        } = this.state;
        const card = this.cardRef.current.inputRef.inputRef.value;
        const branch = this.branchRef.current.inputRef.inputRef.value;

        if (!this._validateForm({ bank, card, province, city, branch })) return false;

        axios
            .post(`${api.ADD_BANK}`, {
                token,
                bank,
                card,
                province,
                city,
                branch
            })
            .then(res => {
                if (res.data.status === "1") {
                    Toast.success("添加成功", 1, () => {
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
            realName
        } = this.state;
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={
                            <Link to="/member/profile/bank/index">
                            <Icon
                                type="left"
                                style={{ width: "30px", height: "30px" }}
                            />
                            </Link>
                        }
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
                            placeholder="请输入银行卡号"
                            ref={this.cardRef}
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
                            ref={this.branchRef}
                            placeholder="请输入支行名称"
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
                            确认添加
                        </Button>
                    </WingBlank>
                </Fragment>
            </DocumentTitle>
        );
    }
    _fetchArea(token, reid = 1, fn) {
        axios.post(`${api.GET_AREA}`, { token, reid }).then(res => {
            if (res.data.status === "1") {
                fn(res.data.data);
            }
        });
    }

    _fetchUserInfo = token => {
        const { history } = this.props;
        axios.post(`${api.USER_INFO}`, { token }).then(res => {
            if (res.data.status === "1") {
                if (res.data.data.id_auth !== 1) {
                    Toast.fail("实名认证后才可添加银行卡", 1, () => {
                        history.go(-1);
                    });
                } else {
                    this.setState({
                        realName: res.data.data.name
                    });
                }
            }
        });
    };
    _fetchBankList = token => {
        axios.post(`${api.BANK_LIST}`, { token }).then(res => {
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
}

const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(BankAdd));
