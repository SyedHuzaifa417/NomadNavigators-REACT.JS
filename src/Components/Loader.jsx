import React from "react";

const loaderStyle = {
  position: "relative",
  width: "108px",
  display: "flex",
  justifyContent: "space-between",
};

const eyeStyle = {
  content: '""',
  display: "inline-block",
  width: "48px",
  height: "48px",
  backgroundColor: "#fff",
  backgroundImage: "radial-gradient(circle 14px, #0d161b 100%, transparent 0)",
  backgroundRepeat: "no-repeat",
  borderRadius: "50%",
  border: "2px solid #000",
  animation: "eyeMove 5s infinite, blink 5s infinite",
};

const loaderKeyframes = `
  @keyframes eyeMove {
    0%, 10% { background-position: 0px 0px; }
    13%, 40% { background-position: -15px 0px; }
    43%, 70% { background-position: 15px 0px; }
    73%, 90% { background-position: 0px 15px; }
    93%, 100% { background-position: 0px 0px; }
  }
  @keyframes blink {
    0%, 10%, 12%, 20%, 22%, 40%, 42%, 60%, 62%, 70%, 72%, 90%, 92%, 98%, 100% { height: 48px; }
    11%, 21%, 41%, 61%, 71%, 91%, 99% { height: 18px; }
  }
`;

const Loader = () => {
  return (
    <div>
      <style>{loaderKeyframes}</style>
      <div style={loaderStyle}>
        <div style={eyeStyle}></div>
        <div style={eyeStyle}></div>
      </div>
    </div>
  );
};

export default Loader;
