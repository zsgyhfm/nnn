import "./market-data.css";

import React, { PureComponent } from "react";
import { Flex } from "antd-mobile";
import classnames from "classnames";
import load from "load-script";

export default class MarketData extends PureComponent {
    constructor() {
        super();
        this.loadScript();
    }
    state = {
        index: [
            {
                sh: [],
                sz: [],
                cy: []
            }
        ]
    };
    loadScript = () => {
        let script = document.getElementById("script");
        script && script.remove();
        load(
            "https://hq.sinajs.cn/list=s_sh000001,s_sz399001,s_sz399006",
            {
                async: false,
                attrs: {
                    id: "script"
                }
            },
            (err, script) => {
                const sh = window.hq_str_s_sh000001.split(",");
                const sz = window.hq_str_s_sz399001.split(",");
                const cy = window.hq_str_s_sz399006.split(",");

                this.setState({ index: { sh, sz, cy } });
            }
        );
    };

    componentDidMount() {
        this.timmer = setInterval(this.loadScript, 10000);
    }

    componentWillUnmount(){
        clearInterval(this.timmer)
    }

    render() {
        const { sh, sz, cy } = this.state.index;
        return <Flex className="market-data">
                <Flex.Item>
                    <div className="market-data__title">上证指数</div>
                    <div className={classnames("market-data__number", {
                            red: sh && sh[2] > 0,
                            green: sh && sh[2] < 0
                        })}>
                        {sh && sh.length ? (+sh[1]).toFixed(2) : "--"}
                    </div>
                    <div className="market-data__range">
                        <span>
                            {sh && sh[2] > 0 ? "+" : null}

                            {sh && sh.length ? (+sh[2]).toFixed(2) : "--"}
                        </span>
                        <span>
                            {sh && sh[2] > 0 ? "+" : null}
                            {sh && sh.length ? (+sh[3]).toFixed(2) : "--"}%
                        </span>
                    </div>
                </Flex.Item>
                <Flex.Item>
                    <div className="market-data__title">深证指数</div>
                    <div className={classnames("market-data__number", {
                            red: sz && sz[2] > 0,
                            green: sz && sz[2] < 0
                        })}>
                        {sz && sz.length ? (+sz[1]).toFixed(2) : "--"}
                    </div>
                    <div className="market-data__range">
                        <span>
                            {sz && sz[2] > 0 ? "+" : null}
                            {sz && sz.length ? (+sz[2]).toFixed(2) : "--"}
                        </span>
                        <span>
                            {sz && sz[2] > 0 ? "+" : null}
                            {sz && sz.length ? (+sz[3]).toFixed(2) : "--"}%
                        </span>
                    </div>
                </Flex.Item>
                <Flex.Item>
                    <div className="market-data__title">创业指数</div>
                    <div className={classnames("market-data__number", {
                            red: cy && cy[2] > 0,
                            green: cy && cy[2] < 0
                        })}>
                        {cy && cy.length ? (+cy[1]).toFixed(2) : "--"}
                    </div>
                    <div className="market-data__range">
                        <span>
                            {cy && cy[2] > 0 ? "+" : null}
                            {cy && cy.length ? (+cy[2]).toFixed(2) : "--"}
                        </span>
                        <span>
                            {cy && cy[2] > 0 ? "+" : null}
                            {cy && cy.length ? (+cy[3]).toFixed(2) : "--"}%
                        </span>
                    </div>
                </Flex.Item>
            </Flex>;
    }
}
