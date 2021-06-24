import '../style/menuitem.css';

const MenuItem = ({ menuItem, openModal }) => {
  const defaultImage = "http://www.texasmonthly.com/wp-content/uploads/2015/11/Tacos-Al-Pastor-Tierra-Caliente-Houston.jpg"
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return(
    <div onClick={() => openModal(menuItem) } className='menu-item-component'>
      <div className='menu-item-details'>
        <h3> { menuItem.name } </h3>
        <div>
        <p>{ menuItem.description }</p>
        </div>
        <p><b>{formatter.format(menuItem.price)}</b></p>
      </div>

      <div className='menu-item-image'>
        <img
          alt={menuItem.name}
          src={defaultImage}
          className="menu-item-img"
        />
      </div>
    </div>
  )
}

export default MenuItem;
