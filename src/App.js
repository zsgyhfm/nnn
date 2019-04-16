import React, { Fragment, PureComponent } from "react";
import { Route, withRouter } from "react-router-dom";
import Index from "./pages/Index/";
import PageLoading from "./components/PageLoading";
// import LoadableVisibility from "react-loadable-visibility/react-loadable";
import LoadableVisibility from "react-loadable";
import PrivateRoute from 'components/Routes/PrivateRoute';

import "./App.css";
// 动态加载 首页需要显示在页面的模块
const Login = LoadableVisibility({
    loader: () => import("./pages/Login/"),//模块地址
    loading: () => <PageLoading />//加载过程中显示的模块
});
const Register = LoadableVisibility({
    loader: () => import("./pages/Register/"),
    loading: () => <PageLoading />
});
const Peizi = LoadableVisibility({
    loader: () => import("./pages/Peizi/"),
    loading: () => <PageLoading />
});
const Agreement = LoadableVisibility({
    loader: () => import("./pages/Agreement/"),
    loading: () => <PageLoading />
});
const Trial = LoadableVisibility({
    loader: () => import("./pages/Peizi/Trial/"),
    loading: () => <PageLoading />
});
const Member = LoadableVisibility({
    loader: () => import("./pages/Member/"),
    loading: () => <PageLoading />
});
const Trade = LoadableVisibility({
    loader: () => import("./pages/Trade/"),
    loading: () => <PageLoading />
});
const Download = LoadableVisibility({
    loader: () => import("./pages/Download/"),
    loading: () => <PageLoading />
});
const Article = LoadableVisibility({
    loader: () => import("./pages/Article/"),
    loading: () => <PageLoading />
});
const Detail = LoadableVisibility({
    loader: () => import("./pages/Article/Detail"),
    loading: () => <PageLoading />
});
const InviteReg = LoadableVisibility({
    loader: () => import("./pages/InviteReg/"),
    loading: () => <PageLoading />
});

const GetPass = LoadableVisibility({
    loader: () => import("./pages/GetPass/"),
    loading: () => <PageLoading />
});
//PureComponent 也是compnent 区别在于 它帮忙实现了简单的 state props的优化【新值和旧址 一致就不刷新渲染】
class App extends PureComponent {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }
    render() {
        return (
            // React 中一个常见模式是为一个组件返回多个元素。Fragments 可以让你聚合一个子元素列表，并且不在DOM中增加额外节点。 类似一个空节点
            <Fragment>
                <Route path="/" exact component={Index} />
                <Route path="/login" component={Login} />
                <Route path="/invite/:code" component={InviteReg} />
                <Route path="/register" component={Register} />
                <Route path="/getpass" component={GetPass} />
                <Route path="/agreement" component={Agreement} />
                <PrivateRoute path="/peizi" component={Peizi} />
                <Route path="/trial" component={Trial} />
                <Route path="/news/:id" component={Article} />
                <Route path="/article/detail/:id/:model" component={Detail} />
                <Route path="/member" component={Member} />
                <Route path="/trade" component={Trade} />
                <Route path="/download" component={Download} />
            </Fragment>
        );
    }
}

export default withRouter(App);
