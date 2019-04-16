import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import NavBar from "components/NavBar";
import { Icon } from "antd-mobile";
import BaseTable from "components/Table/BaseTable";
import CommissionItem from "./CommissionItem";
import PromotionTabNav from "../components/PromotionTabNav";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import * as api from "api";

const pageTitle = "推广明细";

class Commission extends PureComponent {
    state = {
        records: []
    };
    componentDidMount() {
        this._fetchAwardList();
    }
    _fetchAwardList() {
        const { token } = this.props;
        axios.post(`${api.INVITE_AWARD_RECORD}`, { token }).then(res => {
            if (res.data.status === "1") {
                this.setState({
                    records: res.data.data || []
                });
            }
        });
    }
    render() {
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={
                            <Link to="/member/index">
                                <Icon
                                    type="left"
                                    style={{ width: "30px", height: "30px" }}
                                />
                            </Link>
                        }
                    >
                        {pageTitle}
                    </NavBar>
                    <PromotionTabNav />
                    <BaseTable
                        fields={[
                            { label: "奖励时间" },
                            { label: " 奖励来源" },
                            { label: "奖励金额" }
                        ]}
                        lists={this.state.records}
                    >
                        {item => (
                            <CommissionItem
                                key={item.id}
                                time={`${item.create_time} ${item.create_time_m}`}
                                money={item.affect}
                                info={item.info}
                            />
                        )}
                    </BaseTable>
                </Fragment>
            </DocumentTitle>
        );
    }
}


const mapStateToProps = state => ({
    token: state.token
});
export default connect(mapStateToProps)(Commission);
