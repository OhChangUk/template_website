import React, { memo } from 'react'


const Product = memo(function(){
  // 재렌더링이 필요없을 때 사용하면 새로고침 할 때 한번만 사용가능

  console.log("Product 실행")
  return (
    <div>Product</div>
  )
})

export default Product