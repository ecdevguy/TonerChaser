import React, { useState, useMemo, useCallback } from 'react'
import { FixedSizeList as ScrollList } from 'react-window';
import _ from 'lodash';
import Character from './Character'

export default function List() {
  
// Add side panel for displaying character on hover/click, display related characters on the bottom based on related tags to selected character.
  
  const unfilteredList = [
    ...JSON.parse(localStorage.getItem("tocfl1")), 
    ...JSON.parse(localStorage.getItem("tocfl2")),
    ...JSON.parse(localStorage.getItem("tocfl3"))];
  
  const Row = ({ index, style, data }) => {
    const item = data[index];
    return (
      <div style={style}>
        <Character
          word={item.Word}
          pinyin={item.Pinyin}
          otherPinyin={item.OtherPinyin}
          level={item.Level}
          firstTranslation={item["First Translation"]}
          audio={true}
        />
      </div>
    );
  };

  const [filterLevel, setFilterLevel] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const filteredItems = useMemo(() => {
    return unfilteredList.filter(item =>
      (filterLevel.length === 0 || filterLevel.includes(item.Level)) &&
      (item.Word.includes(inputValue) || item["First Translation"].includes(inputValue))
    );
  }, [filterLevel, inputValue]);

  const handleFilterChange = useCallback(_.debounce((value) => {
    setInputValue(value);
  }, 250), []);

  // const vocab = props.currentVocab.map(x => 
  // <Character 
  //   word={x.Word}
  //   pinyin={x.Pinyin}
  //   otherPinyin={x.OtherPinyin}
  //   level={x.Level}
  //   firstTranslation={x["First Translation"]}
  //   audio={true}
  // />)
  return(
    <>
      <h1>list mode</h1>
      <div>
      <input
        type="text"
        onChange={(e) => handleFilterChange(e.target.value)}
        placeholder="Filter by word..."
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={filterLevel.includes(1)}
            onChange={() => setFilterLevel(prev => prev.includes(1) ? prev.filter(l => l !== 1) : [...prev, 1])}
          /> Level 1
        </label>
        <label>
          <input
            type="checkbox"
            checked={filterLevel.includes(2)}
            onChange={() => setFilterLevel(prev => prev.includes(2) ? prev.filter(l => l !== 2) : [...prev, 2])}
          /> Level 2
        </label>
        <label>
          <input
            type="checkbox"
            checked={filterLevel.includes(3)}
            onChange={() => setFilterLevel(prev => prev.includes(3) ? prev.filter(l => l !== 3) : [...prev, 3])}
          /> Level 3
        </label>
      </div>
      <ScrollList
        height={300}
        width={600}
        itemSize={65}
        itemCount={filteredItems.length}
        itemData={filteredItems}
      >
        {Row}
      </ScrollList>
    </div>
    </>
  )
}
