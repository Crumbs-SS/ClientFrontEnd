
const FilterOption = props => {
  const text = props.text;
  return(
    <div data-testid='filter-option' className='filter-option'>
      <span> {text} </span>
    </div>
  )
}

export default FilterOption;
