import React,{Fragment} from "react";

const withTableEmpty = Component => {
  return class extends React.Component {
    render() {
      const { colSpan, emptyMsg, data, ...rest } = this.props;
      if (data.length) {
        return <Component data={data} {...rest} />;
      }
      return <EmptyTable colSpan={colSpan} message={emptyMsg} />;
    }
  };
};

const EmptyTable = ({ colSpan, message = "暂无数据" }) => {
  return (
    <Fragment>
      <tr>
        <td colSpan={colSpan}>{message}</td>
      </tr>
    </Fragment>
  );
};

export default withTableEmpty;
