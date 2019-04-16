import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { WingBlank, Toast, Icon, Button } from "antd-mobile";
import MoneyInput from "../components/MoneyInput";
import DurationSelect from "../components/DurationSelect";
import RatioSelect from "../components/RatioSelect";
import NavBar from "components/NavBar";
import BottomFixedContainer from "components/BottomFixedContainer";
import PageContainer from "components/PageContainer";
import ProductTab from "../components/ProductTab";
import axios from "axios";
import * as api from "api";

const pageTitle = "免息配资";
const peiziType = 5;
class Month extends PureComponent {
    constructor(props) {
        super(props);
        this._fetchPageData(props.token);
    }

    state = {
        money: null,
        accountMoney: 0,
        moneyRange: [],
        duration: [],
        activeDuration: null,
        multiple: [],
        activeMultiple: null,
        maxDuration: 0,
        minDuration: 0,
        rate: [],
        multipleRate: [],
        lineSetting: [],
        freeSet: [],
        position: []
    };

    onMoneyChange = money => {
        this.setState({
            money: parseInt(money, 10)
        });
    };

    _fetchPageData(token) {
        axios.post(`${api.PAGE_FREE}`, { token }).then(res => {
            const {
                money_range,
                account_money,
                free_loss,
                free_set,
                position
            } = res.data.data;
            this.setState({
                accountMoney: account_money,
                moneyRange: money_range,
                activeDuration: free_set[1],
                lineSetting: free_loss,
                multipleRate: free_set[0],
                rate: [free_set[0]],
                freeSet: free_set,
                activeMultiple: free_set[0],
                position
            });
        });
    }

    onSubmit = () => {
        const { token, history } = this.props;
        const {
            activeMultiple,
            activeDuration,
            money,
            lineSetting,
            accountMoney,
            freeSet,
            position
        } = this.state;
        if (!this._checkSubmit()) return;
        Toast.loading(null, 0);
        axios
            .post(`${api.PEIZI_CHECK_APPLY}`, {
                token,
                type: peiziType,
                multiple: activeMultiple,
                borrow_duration: activeDuration,
                deposit_money: money
            })
            .then(res => {
                Toast.hide();
                if (res.data.status === "1") {
                    history.push({
                        pathname: "/peizi/confirm",
                        state: {
                            money,
                            activeDuration,
                            activeMultiple: +activeMultiple,
                            type: peiziType,
                            lineSetting,
                            accountMoney,
                            freeSet,
                            rate: 0,
                            position
                        }
                    });
                } else {
                    Toast.info(res.data.message);
                }
            })
            .catch(err => {
                Toast.hide();
            });
    };
    _checkSubmit = () => {
        const {
            money,
            moneyRange,
            activeMultiple,
            activeDuration
        } = this.state;

        if (money === null) {
            Toast.info("请输入保证金金额", 1, null, false);
            return false;
        }
        if (money < moneyRange[0]) {
            Toast.info(`保证金金额最少为${moneyRange[0]}元`, 1, null, false);
            return false;
        }
        if (money > moneyRange[1]) {
            Toast.info(`保证金金额最多为${moneyRange[1]}元`, 1, null, false);
            return false;
        }
        if (money % moneyRange[2] !== 0) {
            Toast.info(
                `保证金金额必须是${moneyRange[2]}的整数倍`,
                1,
                null,
                false
            );
            return false;
        }

        if (activeDuration === null) {
            Toast.info(`请选择操盘期限`, 1, null, false);
            return false;
        }
        if (activeMultiple === null) {
            Toast.info(`请选择配资金额`, 1, null, false);
            return false;
        }
        return true;
    };
    render() {
        const {
            money,
            moneyRange,
            activeDuration,
            activeMultiple,
            rate
        } = this.state;

        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <BottomFixedContainer>
                        <Button
                            type="primary"
                            onClick={this.onSubmit}
                            style={{
                                borderRadius: 0,
                                background: "#FE4500",
                                border: "none",
                                boxShadow: "none"
                            }}
                        >
                            下一步
                        </Button>
                    </BottomFixedContainer>
                    <PageContainer>
                        <NavBar
                            left={
                                <Link to="/">
                                    <Icon
                                        type="left"
                                        style={{
                                            width: "30px",
                                            height: "30px"
                                        }}
                                    />
                                </Link>
                            }
                        >
                            {pageTitle}
                        </NavBar>
                        <ProductTab />
                        <WingBlank>
                            <MoneyInput
                                max={moneyRange[1]}
                                min={moneyRange[0]}
                                step={moneyRange[2]}
                                onChange={this.onMoneyChange}
                            />
                            <DurationSelect
                                title="操盘期限"
                                suffix="天"
                                readOnly
                                activeItem={activeDuration}
                            />
                            <RatioSelect
                                rate={rate}
                                money={money}
                                readOnly
                                onSelect={() => {}}
                                activeMultiple={activeMultiple}
                            />
                        </WingBlank>
                    </PageContainer>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token,
    isLogin: state.isLogin
});
export default withRouter(connect(mapStateToProps)(Month));
