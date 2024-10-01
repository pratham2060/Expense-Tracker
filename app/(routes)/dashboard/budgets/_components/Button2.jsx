import React from 'react';

const Button2 = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 
        bg-white
        text-black
        rounded-md 
        shadow-md 
        transition-all 
        duration-300 
        ease-in-out  
        hover:shadow-lg  
        active:shadow-sm 
        focus:outline-none 
        focus:ring-2  
        focus:ring-opacity-50 
        ${className}
      `}
      style={{
        width: "60px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

export default Button2;
