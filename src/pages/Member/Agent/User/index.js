import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, Icon, Toast } from "antd-mobile";
import axios from "axios";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import * as api from "api";
import ListGroup from "components/List/ListGroup";
import AgentPromptMessage from "./AgentPromptMessage";
import OperateBtn from "./OperateBtn";
import OperateBtnLink from "./OperateBtnLink";
import OperateBtnDisabled from "./OperateBtnDisabled";
import Validator from "Validator";
const prompt = Modal.prompt;
const pageTitle = "用户管理详情";

class User extends Component {
    state = {
        info: this.props.location.state,
        rate: 0
    };

    componentDidMount() {
        this._isMount = true;
        this.getAgentRate();
    }
    componentWillUnmount = () => {
        this._isMount = false;
    };

    getAgentRate = () => {
        axios
            .post(`${api.AGENT_PAGE}`, { token: this.props.token })
            .then(res => {
                if (this._isMount) {
                    const { agent_rate } = res.data.data;
                    this.setState({
                        rate: agent_rate
                    });
                }
            });
    };

    setAgent = changeStatus => {
        prompt(
            changeStatus ? "设置该用户为代理商" : "设置返佣比例",
            <AgentPromptMessage rate={this.state.rate} />,
            [
                { text: "取消" },
                {
                    text: "确认",
                    onPress: value => {
                        this._changeRate(value, changeStatus);
                    }
                }
            ],
            "default",
            null,
            ["请输入佣金比例"]
        );
    };

    _changeRate = (value, resetAgentStatus) => {
        if (!Validator.positiveInteger(value))
            return Toast.fail("佣金比例只支持正整数");
        if (value > 100) return Toast.fail("最大佣金比例为100%");

        const { token,history } = this.props;
        const { info } = this.state;
        axios
            .post(`${api.SET_AGENT_RATE}`, {
                chang_uid: info.invitation_mid,
                token,
                rate: value
            })
            .then(res => {
                if (res.data.status === "1") {
                    const prevInfo = this.state.info;
                    this.setState({
                        info: {
                            ...prevInfo,
                            agent_pro: resetAgentStatus ? 1 : 0,
                            agent_rate: value,
                        }
                    });
                    Toast.success(res.data.message, 1, () => {
                        history.goBack()
                    });
                } else {
                    Toast.fail(res.data.message);
                }
            });
    };

    changeAgentStatus = () => {
        const { token } = this.props;
        const { info } = this.state;
        axios
            .post(`${api.CHANGE_AGENT_STATUS}`, {
                token,
                agent_pro: info.agent_pro,
                chang_uid: info.invitation_mid
            })
            .then(res => {
                if (res.data.status === "1") {
                    const prevInfo = this.state.info;
                    this.setState(
                        {
                            info: { ...prevInfo, agent_pro: res.data.data }
                        },
                        () => {
                            window.location.reload();
                        }
                    );
                } else {
                    Toast.info(res.data.message, 1, null, false);
                }
            });
    };
    render() {
        const { info } = this.state;

        const isNormalUser = info.agent_id === 0;
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
                        onLeftClick={() => {
                            window.history.back();
                        }}
                    >
                        {pageTitle}
                    </NavBar>
                    <ListGroup>
                        <ListGroup.Item title="手机号">
                            {info.mobile}
                        </ListGroup.Item>
                        <ListGroup.Item title="姓名">
                            {info.name}
                        </ListGroup.Item>
                        <ListGroup.Item title="注册时间">
                            {info.create_time} {info.create_time_m}
                        </ListGroup.Item>
                        <ListGroup.Item title="用户级别">
                            {info.agent_id === 1 || info.agent_id === 2 ? (
                                <OperateBtnDisabled>
                                    已是代理
                                </OperateBtnDisabled>
                            ) : (
                                <OperateBtn onClick={() => this.setAgent(true)}>
                                    设为代理
                                </OperateBtn>
                            )}
                            {info.agent_des}
                        </ListGroup.Item>
                        <ListGroup.Item title="代理状态">
                            {isNormalUser ? null : (
                                <Fragment>
                                    <OperateBtn
                                        onClick={this.changeAgentStatus}
                                    >
                                        {info.agent_pro === 1
                                            ? "停止代理"
                                            : "重新启用"}
                                    </OperateBtn>
                                    <span>
                                        {info.agent_pro === 1
                                            ? "正常"
                                            : "已停止"}
                                    </span>
                                </Fragment>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item title="返佣比例">
                            {isNormalUser ? null : (
                                <Fragment>
                                    <OperateBtn onClick={() => this.setAgent()}>
                                        修改比例
                                    </OperateBtn>
                                    <span>{info.agent_rate}%</span>
                                </Fragment>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item title="邀请用户">
                            <OperateBtnLink
                                to={`/member/agent/invite/${
                                    info.invitation_mid
                                }`}
                            >
                                查看用户
                            </OperateBtnLink>
                            {info.profit_member}
                        </ListGroup.Item>
                        <ListGroup.Item title="他的收入">
                            {info.invitation_money}
                        </ListGroup.Item>
                        <ListGroup.Item title="替你赚取">
                            {info.agents_profit_money}
                        </ListGroup.Item>
                    </ListGroup>
                </Fragment>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});
export default withRouter(connect(mapStateToProps)(User));
