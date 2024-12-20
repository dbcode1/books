import React, { useEffect, useState } from "react";
import "./Fade.css"
const Fade = ({ show, children }) => {
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onEnd = () => {
    if (!show) setRender(false);
  };

  return (
    render && (
      <div
        style={{ animation: `${show ? "fadeIn" : "fadeOut"} 750ms` }}
        onAnimationEnd={onEnd}
      >
        {children}
      </div>
    )
  );
};
export default Fade;
