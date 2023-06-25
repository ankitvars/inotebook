import React from "react";

const Alert = (props) => {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    } else if (word === "success") {
      word = "hurray!";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div
      style={{ height: "70px", marginTop: "2px" }}
      className="d-flex justify-content-center"
    >
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissable fadeshow`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;
