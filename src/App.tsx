import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Message from "./components/Message";
import { IMessages } from "./interfaces/IMessages";
import IMessage from "./interfaces/IMessage";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  getAccordionDetailsUtilityClass,
} from "@mui/material";
import firebase from "./firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import BasicForm from "./components/BasicForm";
import Test from "./components/Test";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<IMessages>([]);
  const [username, setUsername] = useState("");

  const query = firebase.firestore().collection("messages");

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
    <div className="App">
      <Routes>
        <Route path="login" element={<BasicForm title="login" />} />
        <Route path="register" element={<BasicForm title="register" />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
