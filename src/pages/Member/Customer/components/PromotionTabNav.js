import React from "react";
import TabBarNav from "components/TabBarNav";

const PromotionTabNav = () => {
    return (
        <TabBarNav
            items={[
                {
                    link: "/member/customer/users",
                    title: "邀请用户"
                },
                {
                    link: "/member/customer/commission",
                    title: "获得佣金"
                }
            ]}
        />
    );
};

export default PromotionTabNav;
