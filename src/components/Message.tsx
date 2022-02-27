import React from "react";
import IMessage from '../interfaces/IMessage'

function Message(props: IMessage) {
  const { message, username } = props
  return (
    <div>
      <p>
        <span style={{ fontWeight: "bold" }}>{`${username}:`}</span>
        {` ${message}`}
      </p>
    </div>
  );
}

export default Message;
