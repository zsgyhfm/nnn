import React from "react";

const withEmpty = (data, Component, EmptyComponent) => {
    if (data.length === 0) return EmptyComponent;
    return <Component data={data} />;
};

export default withEmpty;
