import { useState, useEffect } from "react";
import Message from "../components/Message";
import { IMessages } from "../interfaces/IMessages";
import { FormControl, InputLabel, Input } from "@mui/material";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";

function Test() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<IMessages>([]);
  const [username, setUsername] = useState("");

  const query = firebase.firestore().collection("messages");

  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/test");
    }

    if (!authToken) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    query.onSnapshot((snapshot: any) => {
      setMessages(
        snapshot.docs.map((doc: any) => {
          let temp = doc.data();
          temp.id = doc.id;
          return temp;
        })
      );
    });
  });

  useEffect(() => {
    // setUsername(prompt("Please enter your name"));
  }, []);

  // const sendMessage = (event: any) => {
  //   event.preventDefault();
  //   setMessages([...messages, { username, text: input }]);
  //   setInput("");
  // };

  return (
    <div className="Test">
      <h2>Welcome {username}</h2>
      <form>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          {/* <Button
            disabled={!input}
            variant="outlined"
            type="submit"
            onClick={sendMessage}
          > */}
          {/* Send Message
          </Button> */}
        </FormControl>
      </form>
      {messages.map((message: any) => (
        <Message
          key={message.id}
          id={message.id}
          username={message.username}
          message={message.message}
        />
      ))}
    </div>
  );
}

export default Test;
