import { Route, Routes } from 'react-router-dom'
import Root from './Root/Root';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/product/:productId" element={<ProductDetail id={undefined}/>} />
    </Routes>
  );
}
export default App;
