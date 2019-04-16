import React, { Fragment } from "react";
import PeiziBase from "./PeiziBase";
import { withRouter } from "react-router-dom";
import PrivateRoute from "components/Routes/PrivateRoute";

const Peizi = () => {
    return (
        <Fragment>
            {/*//PrivateRoute验证是否登陆，否就转到登陆模块*/}
            {/*//key 代表操盘的状态 全部、操盘中、审核中、未通过、已结束*/}
            <PrivateRoute
                path="/member/peizi/list/index"
                component={() => <PeiziBase key="index" type="index" />}
            />
            <PrivateRoute
                path="/member/peizi/list/using"
                component={() => <PeiziBase key="using" type="using" />}
            />
            <PrivateRoute
                path="/member/peizi/list/waiting"
                component={() => <PeiziBase key="waiting" type="waiting" />}
            />
            <PrivateRoute
                path="/member/peizi/list/failed"
                component={() => <PeiziBase key="failed" type="failed" />}
            />
            <PrivateRoute
                path="/member/peizi/list/finished"
                component={() => <PeiziBase key="finished" type="finished" />}
            />
        </Fragment>
    );
};
export default withRouter(Peizi);
