import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderById, resetOrder} from '../../reduxStore/actions/orderActions'
import Loader from '../../components/Loader'

const OrderDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {order, loading} = useSelector(state => state.ordersData)

    useEffect(() => {
        dispatch(getOrderById(id))

        return () => {
            dispatch(resetOrder())
        }
    }, [id])

    
    if (loading) return <Loader />
    return (
        <div>
            <h2>Order Details</h2>
        </div>
    )
}

export default OrderDetails
