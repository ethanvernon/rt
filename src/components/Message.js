import React from "react";

function Message(props) {
  return (
    <div>
      <p>
        <span style={{ fontWeight: "bold" }}>{`${props.username}:`}</span>
        {` ${props.text}`}
      </p>
    </div>
  );
}

export default Message;
