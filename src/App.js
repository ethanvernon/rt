import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Message from "./components/Message";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  getAccordionDetailsUtilityClass,
} from "@mui/material";
import firebase from "./firebase";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  const query = firebase.firestore().collection("messages");

  useEffect(() => {
    query.onSnapshot((snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => {
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

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, { username, text: input }]);
    setInput("");
  };

  return (
    <div className="App">
      <h2>Welcome {username}</h2>
      <form>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />{" "}
          <Button
            disabled={!input}
            variant="outlined"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </Button>
        </FormControl>
      </form>
      {messages.map((message) => (
        <Message
          key={message.id}
          username={message.username}
          text={message.message}
        />
      ))}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
