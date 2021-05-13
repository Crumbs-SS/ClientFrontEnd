
const SearchResult = props => {
  const restaurant = props.result;

  return(
    <div className='search-result'>
      <div className='img-holder'>
        <img
          alt="restaurant"
          src={"https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"}
          className="restaurant-img"
        />
      </div>
      <div className='rest-card-info'>
        <h5> {restaurant.name} </h5>
        <p> {restaurant.address}  </p>
      </div>
    </div>
  )
}

export default SearchResult;
