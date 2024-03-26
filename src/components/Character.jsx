import React from 'react'

export default function Character(props) {
  const playAudio = () => {
    fetch(`https://pinyin-word-api.vercel.app/api/audio/${props.word}`)
      .then(response => response.blob())
      .then(blob => {
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
      })
      .catch(error => console.error('Error fetching audio:', error));
  };

  return (
    <div>
      <span>{props.word}</span>
      <span>{props.pinyin}</span>
      <span>{props.otherPinyin}</span>
      <span>{props.level}</span>
      {props.audio && <button onClick={playAudio}>Play Audio</button>}
    </div>
  );
}