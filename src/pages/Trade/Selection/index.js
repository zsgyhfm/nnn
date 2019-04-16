import React, { Component, Fragment } from "react";
import DocumentTitle from "react-document-title";
import { Icon } from "antd-mobile";
import NavBar from "components/NavBar";
import Footer from "components/Footer";
import PageContainer from "components/PageContainer";
import NavBarSearch from "components/NavBarSearch";
import MarketHeader from "../components/MarketHeader";
import { connect } from "react-redux";
import StockIndex from "../components/StockIndex";
import round from "lodash/round";
import orderBy from "lodash/orderBy";
import { fetchSelections } from "actions/selection";
import SelectionList from "./SelectionList";

const pageTitle = "我的自选";

class Selection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: props.selection.map(item => ({
                ...item,
                range: round(item.current_price - item.yesterday_price, 2),
                rate: round(
                    ((item.current_price - item.yesterday_price) /
                        item.yesterday_price) *
                        100,
                    2
                )
            }))
        };
    }

    componentDidUpdate(prevProps, prevState) {

        if (
            this.props.selection.length !== 0 &&
            prevState.selection.length === 0
        ) {
            this.setState({
                selection: this.props.selection.map(item => ({
                    ...item,
                    range: round(item.current_price - item.yesterday_price, 2),
                    rate: round(
                        ((item.current_price - item.yesterday_price) /
                            item.yesterday_price) *
                            100,
                        2
                    )
                }))
            });
        }
    }

    componentDidMount() {
        const { fetchSelections, memberId: uid, token } = this.props;
        if (uid && token) fetchSelections(uid, token);
    }

    orderByRange = sort => {
        const selection = this.state.selection;
        this.rangeRule = this.rangeRule === "desc" ? "asc" : "desc";
        const sortedOrder = orderBy(selection, sort, this.rangeRule);
        this.setState({
            selection: sortedOrder
        });
    };
    render() {
        return (
            <DocumentTitle title={pageTitle}>
                <Fragment>
                    <NavBar
                        left={<Icon type="left" />}
                        onLeftClick={() => window.history.back(-1)}
                        right={
                            <NavBarSearch to="/trade/search">
                                <Icon type="search" />
                            </NavBarSearch>
                        }
                    >
                        <MarketHeader />
                    </NavBar>
                    <Footer />
                    <PageContainer>
                        <StockIndex />
                        <SelectionList
                            selection={this.state.selection}
                            orderByRange={this.orderByRange}
                        />
                    </PageContainer>
                </Fragment>
            </DocumentTitle>
        );
    }
}
const mapStateToProps = state => ({
    token: state.token,
    memberId: state.memberId,
    selection: state.selection
});

const mapDispatchToProps = dispatch => ({
    fetchSelections: (uid, token) => {
        dispatch(fetchSelections(uid, token));
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Selection);
