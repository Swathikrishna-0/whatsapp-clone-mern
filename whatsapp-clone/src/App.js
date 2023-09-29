import { useEffect } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";


function App() {

  useEffect(()=>{
    const pusher = new Pusher('a942192b0894c3f75ab7', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(data) {
      alert(JSON.stringify(data));
    });
  },[])

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
