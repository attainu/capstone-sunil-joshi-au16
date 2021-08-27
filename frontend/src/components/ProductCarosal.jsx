import React,{ useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel ,Image} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listTopProducts} from '../actions/productActions'

const ProductCarosal = () => {

    const dispatch = useDispatch()

    const topProducts = useSelector((state) => state.topProducts)
    const {loading ,products , error} =  topProducts

    console.log(products)

    useEffect(()=> {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? <Loader/> : error ? (<Message variant ='danger'>{error}</Message>) :
    (
        <Carousel  className = 'bg-primary'>
            {products.map((product) => (
                <Carousel.Item key={product._id} interval={1000} >
                    <Link to={`/product/${product._id}`} >
                        <Image src={product.image} alt={product.name} />
                        <Carousel.Caption className='carousel-caption' >
                            <h2>{product.name} </h2>

                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarosal
