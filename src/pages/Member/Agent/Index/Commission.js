import ReactDOM from "react-dom";
import React, { PureComponent } from "react";
import CommissionItem from "./CommissionItem";
import PromotionTabNav from "../components/PromotionTabNav";
import { connect } from "react-redux";
import { Modal, ListView } from "antd-mobile";
import axios from "axios";
import * as api from "api";
import { ScrollBodyContainer } from "./Style";
import CommissionHeader from "./CommissionHeader";
import ListViewBody from "./ListViewBody";

class Commission extends PureComponent {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.pageIndex = 0;
        this.rData = [];
        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight,
            useBodyScroll: false,
            hasMore: true
        };
    }

    componentDidMount() {
        this._isMount = true;
        const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
        this._fetchAwardList(++this.pageIndex, hei);
    }
    onEndReached = () => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this._fetchAwardList(++this.pageIndex);
    };
    _fetchAwardList(page, hei) {
        this.setState({
            loading: true
        });
        const { token } = this.props;
        axios
            .post(`${api.INVITE_AWARD_RECORD}?page=${page}`, { token })
            .then(res => {
                if (
                    this._isMount &&
                    res.data.status === "1" &&
                    res.data.data &&
                    res.data.data.length > 0
                ) {
                    this.rData = [...this.rData, ...res.data.data];

                    if (page === 1) {
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(
                                this.rData
                            ),
                            height: hei,
                            hasMore: res.data.data.length === 10,
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(
                                this.rData
                            ),
                            hasMore: res.data.data.length === 10,
                            isLoading: false
                        });
                    }
                }
            });
    }
    componentWillUnmount = () => {
        this._isMount = false;
    };

    viewMore = info => {
        this.setState({
            showModal: true,
            info
        });
    };
    closeModal = () => {
        this.setState(
            {
                showModal: false
            },
            () => {
                this.setState({
                    info: ""
                });
            }
        );
    };
    render() {
        const row = item => (
            <CommissionItem
                key={item.id}
                time={`${item.create_time} ${item.create_time_m}`}
                money={item.affect}
                info={item.info}
                viewMore={info => this.viewMore(info)}
            />
        );

        return (
            <ScrollBodyContainer>
                <PromotionTabNav />

                <CommissionHeader
                    fields={[
                        { label: "发生时间" },
                        { label: "返佣来源" },
                        { label: "返佣金额" }
                    ]}
                />
                <ListView
                    ref={el => (this.lv = el)}
                    dataSource={this.state.dataSource}
                    renderBodyComponent={() => <ListViewBody />}
                    style={{
                        height: this.state.height,
                        overflow: "auto"
                    }}
                    scrollRenderAheadDistance={200}
                    onEndReached={this.onEndReached}
                    pageSize={10}
                    renderRow={row}
                    renderFooter={() => (
                        <div style={{ textAlign: "center" }}>
                            {this.state.isLoading
                                ? "加载中..."
                                : "---- 已到底部 ----"}
                        </div>
                    )}
                />
                <Modal
                    visible={this.state.showModal}
                    transparent
                    onClose={this.closeModal}
                >
                    {this.state.info}
                </Modal>
            </ScrollBodyContainer>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});
export default connect(mapStateToProps)(Commission);
