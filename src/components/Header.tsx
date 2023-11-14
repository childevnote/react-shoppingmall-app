import '../styles/Header.css'

export default function Header() {
  return (
    <div className='header'>
      <h2>Shop</h2>
      <div className="header-buttons">
        <button>Cart</button>
        <button>MyPage</button>
        <button>Logout</button>
      </div>
    </div>
  )
}
