import React, { PureComponent, Fragment } from "react";
import DocumentTitle from "react-document-title";
import { Icon } from "antd-mobile";
import NavBar from "components/NavBar";
import Article from "components/Article";
import { withRouter } from "react-router-dom";
import * as api from "api";
import axios from "axios";

class Detail extends PureComponent {
    state = {
        article: {}
    };

    componentDidMount() {
        this._isMount = true;
        this._fetchData(this.props.match.params.id, this.props.match.params.model);

    }
    _fetchData(id, model) {
        axios.get(`${api.ARTICLE_DETAIL}?id=${id}&model=${model}`).then(res => {
            if (res.data.status === "1" && this._isMount) {
                this.setState({
                    article: res.data.data
                });
            }
        });
    }
    componentWillUnmount() {
        this.isMount = false;
    }
    render() {
        const { article } = this.state;
        return (
            <DocumentTitle title={article.title || ""}>
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
                        {article.title}
                    </NavBar>
                    <Article
                        title={article.title}
                        showDate={this.props.match.params.model === "2"}
                        date={article.create_time}
                    >
                        {{ __html: article.content }}
                    </Article>
                </Fragment>
            </DocumentTitle>
        );
    }
}

export default withRouter(Detail);
