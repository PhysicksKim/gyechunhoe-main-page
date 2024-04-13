import React, { useState } from 'react';

interface ButtonProps {
  type: 'concert' | 'football';
  onClick: () => void;
}

const Button = ({ type, onClick }: ButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const [activeTimout, setActiveTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleMouseDown = () => {
    if (activeTimout) {
      clearTimeout(activeTimout);
    }
    setIsActive(true);
    setActiveTimeout(
      setTimeout(() => {
        setIsActive(false);
      }, 200),
    );
  };

  return (
    <button
      className={`btn-${type} ${isActive ? 'active' : ''}`}
      onMouseDown={handleMouseDown}
      onClick={onClick}
    ></button>
  );
};

export default Button;
