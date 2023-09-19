import React from 'react'
import '../styles/Home.css'

export default function Home() {

  const [selectedValue, setSelectedValue] = React.useState('모두');

  const handleChange = (e: any) => {
    setSelectedValue(e.target.value);
    console.log(e.target.value)
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="products-buttons">
        <button value={'모두'} onClick={handleChange} style={{ backgroundColor: `${selectedValue === '모두' ? "gray" : ''}` }}>모두</button>
        <button value={'전자기기'} onClick={handleChange} style={{ backgroundColor: `${selectedValue === '전자기기' ? "gray" : ''}` }}>전자기기</button>
        <button value={'쥬얼리'} onClick={handleChange} style={{ backgroundColor: `${selectedValue === '쥬얼리' ? "gray" : ''}` }}>쥬얼리</button>
        <button value={'남성의류'} onClick={handleChange} style={{ backgroundColor: `${selectedValue === '남성의류' ? "gray" : ''}` }}>남성의류</button>
        <button value={'여성의류'} onClick={handleChange} style={{ backgroundColor: `${selectedValue === '여성의류' ? "gray" : ''}` }}>여성의류</button>

      </div>
    </div>
  )
}
