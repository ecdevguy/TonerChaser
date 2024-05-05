import React, { useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';

function ChineseCharacter({ character }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Cleanup function to handle the destruction of HanziWriter instances and their containers properly
    const cleanupWriters = () => {
      if (containerRef.current) {
        // Handle each child container safely
        Array.from(containerRef.current.children).forEach(child => {
          try {
            // Safely attempt to destroy the writer if it exists
            if (child.writer) {
              child.writer.destroy();
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
      container.style.display = 'inline-block';
      containerRef.current.appendChild(container);

      const writer = HanziWriter.create(container.id, char, {
        width: 60,
        height: 60,
        padding: 0,
        showOutline: true,
        showCharacter: false
      });
      writer.quiz();

      // Store the writer reference for later cleanup
      container.writer = writer;
    });

    // Return the cleanup function to be called on component unmount or when character changes
    return cleanupWriters;
  }, [character]);

  return <div ref={containerRef} />;
}

export default ChineseCharacter;
