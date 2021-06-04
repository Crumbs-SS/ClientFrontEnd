import '../style/menuitem.css';

const MenuItem = ({ menuItem }) => {
  const defaultImage = "http://www.texasmonthly.com/wp-content/uploads/2015/11/Tacos-Al-Pastor-Tierra-Caliente-Houston.jpg"

  return(
    <div className='menu-item-component'>
      <div className='menu-item-details'>
        <h3> { menuItem.name } </h3>
        <div>
        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis...At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis...At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis...At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis...At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis...At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis...At vero eos et accusamus et</p>
        </div>
        <p><b>${menuItem.price}</b></p>
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
