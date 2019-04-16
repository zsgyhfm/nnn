import React, { Component, Fragment } from "react";
import NavBar from "components/NavBar";
import { Icon } from "antd-mobile";
import { Link } from "react-router-dom";
import DocumentTitle from "react-document-title";
import DateSelection from "../../components/DateSelection";
import DateRange from "../../components/DateRange";
import BaseTable from "components/Table/BaseTable";
import { connect } from "react-redux";
import axios from "axios";
import QueryEmpty from "../../components/QueryEmpty";
import { getDateStr } from "../../../../../util";

const mapStateToProps = state => ({
    subAccount: state.accountMoney,
    token: state.token
});

const withQueryPage = (QueryPage, pageData) => {
    return connect(mapStateToProps)(
        class QueryPage extends Component {
            state = {
                loading: false,
                deal: [],
                beginDate: new Date(),
                endDate: new Date(),
                dateRangeSelected: 1
            };
            componentDidMount() {
                this.mounted = true;
                if (this.props.subAccount.id) this._fetchData();
            }
            _fetchData = (
                beginday = getDateStr(this.state.beginDate),
                endday = getDateStr(this.state.endDate)
            ) => {
                const { token, subAccount } = this.props;
                this.setState({
                    loading: true
                });
                axios
                    .post(`${pageData.url}`, {
                        token,
                        id: subAccount.id,
                        beginday,
                        endday
                    })
                    .then(res => {
                        if (!this.mounted) return;
                        if (res.data.status === 1) {
                            this.setState({
                                deal: res.data.data.list || res.data.data,
                                loading: false
                            });
                        } else {
                            this.setState({
                                loading: false
                            });
                        }
                    });
            };
            onBeginDateChange = date => {
                if (Date.parse(this.state.endDate) < Date.parse(date)) {
                    const prevEndDate = this.state.endDate;
                    this.setState(
                        {
                            endDate: date,
                            beginDate: prevEndDate,
                            dateRangeSelected: 0
                        },
                        () => {
                            this._fetchData();
                        }
                    );
                } else {
                    this.setState(
                        {
                            beginDate: date,
                            dateRangeSelected: 0
                        },
                        () => {
                            this._fetchData();
                        }
                    );
                }
            };
            onEndDateChange = date => {
                // compare date , exchange date if endDay older then start Day
                if (Date.parse(this.state.beginDate) > Date.parse(date)) {
                    const prevBeginDate = this.state.beginDate;
                    this.setState({
                        endDate: prevBeginDate,
                        beginDate: date,
                        dateRangeSelected: 0
                    },() => {
                        this._fetchData();
                    });
                } else {
                    this.setState({
                        endDate: date,
                        dateRangeSelected: 0
                    },() => {
                        this._fetchData();
                    });
                }
                
            };
            onDateRangeSelect = value => {
                let beginDate;
                let currentDate = new Date();
                switch (value) {
                    case 1:
                        beginDate = new Date();
                        break;
                    case 2:
                        beginDate = new Date(
                            currentDate.setDate(currentDate.getDate() - 7)
                        );
                        break;
                    case 3:
                        beginDate = new Date(
                            currentDate.setDate(currentDate.getDate() - 30)
                        );
                        break;
                    default:
                }

                this.setState(
                    {
                        dateRangeSelected: value,
                        beginDate,
                        endDate: new Date()
                    },
                    () => {
                        this._fetchData();
                    }
                );
            };
            componentWillUnmount() {
                this.mounted = false;
            }
            render() {
                const { pageTitle, fields, handleItem } = pageData;
                return (
                    <DocumentTitle title={pageTitle}>
                        <Fragment>
                            <NavBar
                                left={
                                    <Link to="/trade/account/query/index">
                                        <Icon type="left" />
                                    </Link>
                                }
                            >
                                {pageTitle}
                            </NavBar>
                            <DateSelection
                                beginDate={this.state.beginDate}
                                endDate={this.state.endDate}
                                onBeginChange={this.onBeginDateChange}
                                onEndChange={this.onEndDateChange}
                            />
                            <DateRange
                                onSelect={this.onDateRangeSelect}
                                active={this.state.dateRangeSelected}
                            />

                            <BaseTable
                                fields={fields}
                                lists={this.state.deal}
                                empty={QueryEmpty}
                                loading={this.state.loading}
                            >
                                {item => handleItem(item)}
                            </BaseTable>
                        </Fragment>
                    </DocumentTitle>
                );
            }
        }
    );
};

export default withQueryPage;
