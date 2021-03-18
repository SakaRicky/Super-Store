import React from 'react'

import ProductCard from './ProductCard/ProductCard'
import './products.css'

const Products = ({items}) => {

    return (
        <div className="container my-5">
            <div className="row">
                {items.map(item => {
                    return (
                        <div className="col-md-4 col-sm-6 my-3" key={item._id}>
                            <ProductCard
                                    name={item.name}
                                    imgUrl={item.imageUrl} 
                                    description={item.description} 
                                    price={item.price}
                                    average_rating={item.avgRating}
                                    isOnSale={item.isOnSale}
                                    item_id={item._id}
                                />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Products