import { useState } from 'react';

const FilterOption = ({ text, selectFilter}) => {
  const [ selected, setSelect ] = useState(false);

  const select = () => {
    setSelect(!selected);
    selectFilter(text, selected);
  }

  return(
    <div
      onClick={() => select()}
      data-testid='filter-option'
      className='filter-option'
      style={selected ? {background: "rgb(255, 120, 120)"} : null}
    >
      <span> {text} </span>
    </div>
  )
}

export default FilterOption;
