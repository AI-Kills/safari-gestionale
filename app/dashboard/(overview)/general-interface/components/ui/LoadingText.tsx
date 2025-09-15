import React from 'react';

interface LoadingTextProps {
  text?: string;
  className?: string;
}

export function LoadingText({ text = "Caricamento", className = "" }: LoadingTextProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Testo con effetto wave */}
      <div className="flex">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="animate-wave text-gray-600"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: '2s'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      
      {/* Puntini animati */}
      <div className="flex space-x-1">
        <span 
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: '0s', animationDuration: '1.4s' }}
        ></span>
        <span 
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: '0.2s', animationDuration: '1.4s' }}
        ></span>
        <span 
          className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: '0.4s', animationDuration: '1.4s' }}
        ></span>
      </div>
    </div>
  );
}
