import React,{Fragment} from 'react'
import { Route ,withRouter} from "react-router-dom";
import Index from './Index/'
import Users from './Users/'
import Commission from './Commission/'
const Default = ({match}) => {
    return (
        <Fragment>
            <Route path={`${match.url}/index`} component={Index} />
            <Route path={`${match.url}/users`} component={Users} />
            <Route path={`${match.url}/commission`} component={Commission} />
        </Fragment>
    )
}

export default withRouter(Default)