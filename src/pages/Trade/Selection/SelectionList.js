import React, { Fragment } from "react";

import SelectionItem from "./SelectionItem";
import BaseTable from "components/Table/BaseTable";
import imgUp from "images/shangz@2x.png";
import imgDown from "images/xiad@2x.png";
import NoSelection from "./NoSelection";
const SelectionList = ({ selection, orderByRange }) => {
    return (
        <BaseTable
            fields={[
                { label: "名称", align: "left" },
                { label: "最新" },
                {
                    label: (
                        <Fragment>
                            涨幅{" "}
                            <img src={imgUp} width="10" height="10" alt="up" />
                        </Fragment>
                    ),
                    onClick: () => orderByRange("rate")
                },
                {
                    label: (
                        <Fragment>
                            涨跌{" "}
                            <img
                                src={imgDown}
                                width="10"
                                height="10"
                                alt="up"
                            />
                        </Fragment>
                    ),
                    onClick: () => orderByRange("range")
                }
            ]}
            lists={selection}
            empty={NoSelection}
        >
            {item => <SelectionItem key={item.id} data={item} />}
        </BaseTable>
    );
};
export default SelectionList;
