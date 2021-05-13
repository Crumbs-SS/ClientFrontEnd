
const FilterOption = props => {
  const text = props.text;
  return(
    <div className='filter-option'>
      <span> {text} </span>
    </div>
  )
}

export default FilterOption;
