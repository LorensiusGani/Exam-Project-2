import React from 'react'

interface ButtonProps{
    label: string;
    onClick: () => void;
    loading?: boolean;
    variant?: "primary" | "danger" | "warning" | "gray";
}

const Button: React.FC<ButtonProps> = ({label, onClick, loading, variant = "primary"}) => {
    const colors = {
        primary: "bg-blue-500",
        danger: "bg-red-600",
        warning: "bg-yellow-400",
        gray: "bg-gray-600",
      };
    return (
      <button
      onClick={onClick}
      disabled={loading}
      className={`${colors[variant]} text-black px-4 py-2 rounded font-semibold cursor-pointer mt-2`}
    >
      {loading ? "Processing..." : label}
    </button>
    )
}


export default Button;



