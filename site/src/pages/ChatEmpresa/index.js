import { PrettyChatWindow } from "react-chat-engine-pretty";
import React, {useState} from "react";
import "./chat.css";

const ChatsPageEmpresa = (props) => {
  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => {
    setShowResults(true);
    setActive(!isActive);
  };

  const [isActive, setActive] = useState("false");

  const Results = () => (
    <PrettyChatWindow
      projectId={"8d961901-1384-43a2-94b4-a76bb815305d"}
      username={'Lotus'} // adam
      secret={'pass1234'} // pass1234
      style={{ height: "100vh", width: "100vw", position: "absolute"}}
    />

  );
  
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
        <Results className="chat" /> 
      
    </div>
    
  );
};

export default ChatsPageEmpresa;