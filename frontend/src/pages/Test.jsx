import React from 'react'
import ProductCard from '../components/cards/ProductCard'
import products from '../data/products'

const Test = () => {
    const product = products[2]
    return (
        <ProductCard product={product} />

    )
}

export default Test
