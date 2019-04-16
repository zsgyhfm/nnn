import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Step1 from './Step1'
import Step2 from './Step2'

const Index = () => {
    return (
        <Fragment>
            <Route path="/getpass/step1" component={Step1}></Route>
            <Route path="/getpass/step2" component={Step2}></Route>
        </Fragment>
    )
}

export default Index