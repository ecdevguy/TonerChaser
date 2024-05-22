import React, { useEffect, useRef, useContext } from 'react';
import HanziWriter from 'hanzi-writer';
import SettingsContext from '../context/settingsContext';

function ChineseCharacter({ character }) {
  const { userSettings, setUserSettings } = useContext(SettingsContext);
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  let charCount = 0;
  useEffect(() => {
    // Cleanup function to handle the destruction of HanziWriter instances and their containers properly
    const cleanupWriters = () => {
      if (containerRef.current) {
        // Handle each child container safely
        Array.from(containerRef.current.children).forEach(child => {
          try {
            // Safely attempt to destroy the writer if it exists
            if (child.writer) {
              () => child.writer.destroy();
            }
          } catch (error) {
            console.error("Failed to destroy the writer:", error);
          } finally {
            // Always remove the child from the DOM
            if (containerRef.current) {
              containerRef.current.removeChild(child);
            }
          }
        });
      }
    };

    // If no character is provided, clean up existing writers and containers
    if (!character) {
      cleanupWriters();
      return;
    }

    // Split the character string and create a new writer for each character
    character.split('').forEach((char, index) => {
      const container = document.createElement('div');
      container.id = `hanzi-container-${index}`;
      container.style.display = index === 0 ? 'inline-block' : 'none';
      containerRef.current.appendChild(container);
      charCount = index;
      const writer = HanziWriter.create(container.id, char, {
        width: 210,
        height: 210,
        padding: 10,
        showOutline: true,
        showCharacter: false,
        strokeColor: userSettings.color
      });
      writer.quiz({
        onComplete: function() {
          if (index < charCount) {
            const nextHanzi = document.getElementById(`hanzi-container-${index + 1}`);
          nextHanzi.id = `hanzi-container-${index}`;
          nextHanzi.style.display = 'inline-block';
          container.style.display = 'none';
          } else {
            // container.style.display = 'none';
          }
        }
      });

      // Store the writer reference for later cleanup
      container.writer = writer;
    });

    // Return the cleanup function to be called on component unmount or when character changes
    return cleanupWriters;
  }, [character]);
  const num1 = 200;
  const num2 = num1/2;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ position: 'absolute', zIndex: 1, display: "inline-block" }}>
        <line x1="0" y1="0" x2={num1} y2={num1} stroke="#DDD" />
        <line x1={num1} y1="0" x2="0" y2={num1} stroke="#DDD" />
        <line x1={num2} y1="0" x2={num2} y2={num1} stroke="#DDD" />
        <line x1="0" y1={num2} x2={num1} y2={num2} stroke="#DDD" />
      </svg>
      <div ref={containerRef} style={{ position: 'absolute', zIndex: 2 }} />
    </div>
  )
}

export default ChineseCharacter;
