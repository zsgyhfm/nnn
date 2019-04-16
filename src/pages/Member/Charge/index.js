import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import { Icon, WingBlank, Button, WhiteSpace, Toast } from "antd-mobile";
import NavBar from "components/NavBar";
import Waiter from "components/Waiter";
import MoneyField from "./MoneyField";
import ChargeType from "./ChargeType";
import UserField from "./UserField";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import * as api from "api";
import Validator from "Validator";
const pageTitle = "充值";

class Charge extends PureComponent {
    constructor(props) {
        super(props);
        this.moneyRef = React.createRef();
        this.infoRef = React.createRef();
    }
    state = {
        ways: [],
        checkedWay: null,
        telephone: null,
        serviceTime: null
    };
    componentDidMount() {
        const { token } = this.props;
        axios.post(`${api.CHARGE_PAGE}`, { token }).then(res => {
            if (res.data.status === "1") {
                this.setState({
                    telephone: res.data.data.kfphone,
                    serviceTime: res.data.data.kftime
                });
                if (res.data.data.account.length > 0) {
                    const prevState = this.state;
                    this.setState({
                        ...prevState,
                        ways: res.data.data.account,
                        checkedWay: res.data.data.account[0]
                    });
                }
            } else {
                Toast.fail(res.data.message);
            }
        });
    }
    onChangeWay = selected => {
        this.setState({
            checkedWay: this.state.ways.find(item => item.id === selected[0])
        });
    };
    onSubmit = () => {
        const money = this.moneyRef.current.money.value;
        const info = this.infoRef.current.info.value;
        const checkedWay = this.state.checkedWay;
        if (!this._checkSubmit(money, checkedWay, info)) return false;
        const { token, history } = this.props;
        axios
            .post(`${api.CHARGE_APPLY}`, {
                token,
                money,
                transfer: "transfer",
                cardno: checkedWay.card,
                form_name: info
            })
            .then(res => {
                if (res.data.status === "1") {
                    Toast.success(res.data.message, 1.5, () => {
                        history.push("/member/index");
                    });
                } else {
                    res.data.fail(res.data.message);
                }
            });
    };
    _checkSubmit = (money, checkedWay, info) => {
        if (money === "") return Toast.info("请输入充值金额", 1, null, false);
        if (!Validator.money(money))
            return Toast.info("充值金额输入有误", 1, null, false);

        if (!checkedWay) return Toast.info("暂无用户充值方式", 1, null, false);
        if (info === "") return Toast.info("请输入转账用户名", 1, null, false);

        return true;
    };
    render() {
        const { checkedWay, ways, telephone, serviceTime } = this.state;
        let selectedWay = checkedWay;
        if (!checkedWay && ways.length > 0) selectedWay = ways[0];
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
                    <WingBlank>
                        <MoneyField ref={this.moneyRef} />
                        <ChargeType
                            checkedWay={selectedWay}
                            ways={ways}
                            onChangeWay={this.onChangeWay}
                        />
                        <UserField ref={this.infoRef} />
                        <WhiteSpace size="xl" />
                        <Button
                            type="primary"
                            style={{ background: "#FF4500" }}
                            onClick={this.onSubmit}
                        >
                            已转账成功，提交充值申请
                        </Button>
                        <Waiter telephone={telephone} time={serviceTime} />
                    </WingBlank>
                </Fragment>
            </DocumentTitle>
        );
    }
}
const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(Charge));
