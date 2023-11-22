import { Route, Routes } from 'react-router-dom'
import Root from './Root/Root';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:productId" element={<ProductDetail id={undefined}/>} />
    </Routes>
  );
}
export default App;
