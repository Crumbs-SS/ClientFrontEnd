import { useState, useEffect } from 'react';

const FilterOption = ({ text, sort, selectedSort }) => {
  let span;
  const [ timesClicked, setTimesClicked ] = useState(0);

  useEffect(() => {
    if(selectedSort !== text)
      setTimesClicked(0);
  }, [selectedSort, text])

  switch(timesClicked) {
    case 1:
      span = <span>{text} <i className="fas fa-sort-up"></i></span>
      break;
    case 2:
      span = <span>{text} <i className="fas fa-sort-down"></i></span>
      break;
    default:
      span = <span>{text} <i className="fas fa-sort"></i></span>
    }

    const changeTimesClicked = () => {
      sort(text, timesClicked);
      setTimesClicked((timesClicked + 1) % 3);
    }

  return(
    <div
      onClick={() => changeTimesClicked()}
      data-testid='filter-option'
      className='filter-option'
      style={selectedSort===text ? {background: "rgb(255, 120, 120)"} : null}
    >
      {span}
    </div>
  )
}

export default FilterOption;
