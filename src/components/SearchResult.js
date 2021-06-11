
const SearchResult = ({ result: {name, address}, onClick, result }) => {
  const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvxAJcSQRs2u2vkyS5GoKLm66Op0CqWt0rjg&usqp=CAU"

  return(
    <div onClick={() => onClick(result)} data-testid='search-result' className='search-result'>
      <div className='img-holder'>
        <img
          alt="restaurant"
          src={defaultImage}
          className="restaurant-img"
        />
      </div>
      <div className='rest-card-info'>
        <h5> {name} </h5>
        <p> {address}  </p>
      </div>
    </div>
  )
}

export default SearchResult;
