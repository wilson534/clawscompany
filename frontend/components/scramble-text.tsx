"use client";
import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+<>";

export function ScrambleTextInner({
  text,
  delay = 0,
  revealDuration = 1000,
}: {
  text: string;
  delay?: number;
  revealDuration?: number;
}) {
  const [displayText, setDisplayText] = useState<string>("");
  const hasRevealed = useRef(false);

  useEffect(() => {
    if (hasRevealed.current) return;
    
    let timeout: NodeJS.Timeout;
    let animationFrame: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / revealDuration;
      
      if (progress >= 1) {
        setDisplayText(text);
        hasRevealed.current = true;
        return;
      }

      // Calculate how many characters should be firmly revealed by now
      const revealCount = Math.floor(progress * text.length);

      const nextText = text
        .split("")
        .map((char, index) => {
          // Keep spaces and slashes as is
          if (char === " " || char === "/") return char;
          // Revealed characters
          if (index <= revealCount) return text[index];
          // Scramble the rest randomly each frame
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(nextText);
      animationFrame = requestAnimationFrame(animate);
    };

    // Pre-fill block characters instantly and then start the delay
    setDisplayText(text.replace(/[A-Za-z0-9]/g, "█"));

    timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [text, delay, revealDuration]);

  // Prevent SSR hydration mismatch
  if (!displayText) {
    return <span className="opacity-0">{text}</span>;
  }

  return <span>{displayText}</span>;
}
export function ScrambleText({
  text,
  delay = 0,
  revealDuration = 1000,
  disabled = false,
}: {
  text: string;
  delay?: number;
  revealDuration?: number;
  disabled?: boolean;
}) {
  if (disabled) {
    return <span>{text}</span>;
  }
  return <ScrambleTextInner text={text} delay={delay} revealDuration={revealDuration} />;
}
