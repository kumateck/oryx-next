import React from "react";

interface Props {
  text: string;
}
export const AnimatedText = ({ text }: Props) => {
  return (
    <p className="mt-12 max-w-2xl leading-loose">
      {text.split("").map((char, idx) => (
        <span
          key={char + idx.toString()}
          style={{ transitionDelay: `${500 * (idx / 100)}ms` }}
          className="starting:opacity-25 inline-block opacity-100 transition-all duration-700"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
};
