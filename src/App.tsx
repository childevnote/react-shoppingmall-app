import { Route, Routes } from 'react-router-dom'
import Root from './Root/Root';
import ProductDetail from './pages/ProductDetail';
import MyPage from './pages/Mypage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/product/:productId" element={<ProductDetail />} />
      <Route path="/my-page" element={<MyPage />} />
    </Routes>
  );
}
export default App;
