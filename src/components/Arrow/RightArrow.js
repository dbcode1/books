import react from "react";
import "./Arrow.css"



export default function RightArrow() {
  const scrollRight = () => {
    
  }
  return (
    <div className="arrow" onClick={scrollRight}>
      <svg
        width="100px"
        height="100px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 12H19M19 12L13 6M19 12L13 18"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}
