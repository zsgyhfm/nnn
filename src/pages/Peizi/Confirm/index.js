import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { WingBlank, WhiteSpace, Button, Icon, Toast } from "antd-mobile";
import BottomFixedContainer from "components/BottomFixedContainer";
import PageContainer from "components/PageContainer";
import NavBar from "components/NavBar";
import Overview from "./Overview";
import Agreement from "./Agreement";
import ListGroup from "components/List/ListGroup";
import TextWithQuestionMark from "components/TextWithQuestionMark";
import TextPrimary from "components/Text/TextPrimary";
import * as api from "api";
import axios from "axios";

class Confirm extends PureComponent {
    state = {
        agreement: true
    };
    onSubmit = () => {
        const { token, location, history } = this.props;
        const { state: setting } = location;

        if (!this._checkSubmit()) return;
        axios
            .post(`${api.PEIZI_APPLY}`, {
                token,
                type: setting.type,
                multiple: setting.activeMultiple,
                borrow_duration: setting.activeDuration,
                deposit_money: setting.money
            })
            .then(res => {
                if (res.data.status === "1") {
                    Toast.success("申请成功", 1, () => {
                        history.push("/member/peizi/list/index");
                    });
                } else {
                    Toast.fail(res.data.message);
                }
            })
            .catch(err => {
                Toast.fail("申请失败，请联系管理员");
            });
    };
    _checkSubmit = () => {
        if (!this.state.agreement) {
            Toast.info("请阅读并同意操盘协议", 1, null, false);
            return false;
        }
        return true;
    };
    onChangeAgreement = e => {
        this.setState({
            agreement: e.target.checked
        });
    };
    render() {
        const { state: setting } = this.props.location;
        let unit;
        let payMoney = 0;
        let fee = 0;
        switch (setting.type) {
            case 1:
                unit = "天";
                fee =
                    (setting.money *
                        setting.activeMultiple *
                        setting.activeDuration *
                        setting.rate) /
                    100;
                payMoney = fee + setting.money;
                break;
            case 2:
                unit = "周";
                fee =
                    (setting.money *
                        setting.activeMultiple *
                        setting.activeDuration *
                        setting.rate) /
                    100;
                payMoney = fee + setting.money;
                break;
            case 3:
                unit = "月";
                payMoney =
                    (setting.money * setting.activeMultiple * setting.rate) /
                        100 +
                    setting.money;
                fee =
                    (setting.money * setting.activeMultiple * setting.rate) /
                    100;
                break;
            default:
                payMoney =
                    (setting.money *
                        setting.activeMultiple *
                        setting.activeDuration *
                        setting.rate) /
                        100 +
                    setting.money;
                fee = 0;
                unit = "天";
        }
        const positionRate = setting.position[setting.activeMultiple]
        return (
            <DocumentTitle title="确认申请">
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
                            提交申请信息
                        </Button>
                    </BottomFixedContainer>

                    <PageContainer>
                        <NavBar
                            left={
                                <Icon
                                    type="left"
                                    style={{ width: "30px", height: "30px" }}
                                />
                            }
                            onLeftClick={() => window.history.go(-1)}
                        >
                            确认申请
                        </NavBar>
                        <Overview
                            depositMoney={setting.money}
                            gainMoney={setting.money * setting.activeMultiple}
                            total={setting.money * (+setting.activeMultiple + 1)}
                        />
                        <WhiteSpace />
                        <WingBlank>
                            <ListGroup>
                                <ListGroup.Item
                                    title={
                                        <TextWithQuestionMark
                                            text="预警线"
                                            info="配资资金 + 保证金 X 预警线比例"
                                        />
                                    }
                                >
                                    <TextPrimary>
                                        {setting.money *
                                            setting.activeMultiple +
                                            (setting.money *
                                                setting.lineSetting[0]) /
                                                100}元
                                    </TextPrimary>
                                    <TextNote>
                                        (配资资金+保证金 x{" "}
                                        {setting.lineSetting[0]}%)
                                    </TextNote>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    title={
                                        <TextWithQuestionMark
                                            text="平仓线"
                                            info="配资资金 + 保证金 X 平仓线比例"
                                        />
                                    }
                                >
                                    <TextPrimary>
                                        {setting.money *
                                            setting.activeMultiple +
                                            (setting.money *
                                                setting.lineSetting[1]) /
                                                100}元{" "}
                                    </TextPrimary>
                                    <TextNote>
                                        (配资资金+保证金 x{" "}
                                        {setting.lineSetting[1]}%)
                                    </TextNote>
                                </ListGroup.Item>
                                <ListGroup.Item title="操盘时间">
                                    <TextPrimary>
                                        {setting.activeDuration} {unit}
                                    </TextPrimary>
                                    { setting.type !== 5 && setting.type !== 4 ? 
                                        <TextNote>(默认开启到期自动续期)</TextNote> : null
                                    }
                                    
                                </ListGroup.Item>
                                {setting.type === 5 ? null : (
                                    <ListGroup.Item
                                        title={
                                            setting.type === 3
                                                ? `首月管理费`
                                                : "配资管理费"
                                        }
                                    >
                                        <TextPrimary>{fee}元</TextPrimary>
                                        <TextNote>
                                            (配资资金 x 操盘期限 x{" "}
                                            {setting.rate}%)
                                        </TextNote>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item title="操盘须知">
                                    {setting.type === 5 ? `盈利 ${setting.freeSet[2]}% 归您，其余归平台。` : `单只股票最大持仓比例为 ${positionRate}%`}
                                </ListGroup.Item>
                                <ListGroup.Item title="账户余额">
                                    <TextPrimary>
                                        {setting.accountMoney}元
                                    </TextPrimary>
                                    <BtnChart to="/member/charge">
                                        充值
                                    </BtnChart>
                                </ListGroup.Item>
                                <ListGroup.Item title="确认支付">
                                    <span className="text-primary">
                                        {payMoney}元
                                    </span>
                                </ListGroup.Item>
                            </ListGroup>

                            <Agreement
                                defaultChecked={this.state.agreement}
                                onChange={this.onChangeAgreement}
                            />
                        </WingBlank>
                    </PageContainer>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(Confirm));

const TextNote = styled.span`
    font-size: 13px;
`;

const BtnChart = styled(Link)`
    color: #fff;
    background-color: #fa4400;
    border-radius: 3px;
    padding: 0 3px;
    font-size: 13px;
    display: inline-block;
    line-height: 20px;
    margin-left: 20px;
    position: relative;
    top: -2px;
`;
