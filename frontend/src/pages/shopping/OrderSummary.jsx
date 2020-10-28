import { Container, Grid, Paper, List, ListItem, Divider } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from "react-dom"
import {useSelector} from 'react-redux'
import CartListItem from '../../components/CartListItem'
import Button from '../../components/controls/Button'
import axios from '../../utils/axios'
import {PayPalButton} from 'react-paypal-button-v2'
import Loader from '../../components/Loader'

//const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

const OrderSummary = ({history}) => {

    const {cartItems, quantity, total }= useSelector(state => state.cartData)
    const shipping = JSON.parse(localStorage.getItem('shippingAddress'));
    const [isLoaded, setIsLoaded] = useState(false)
    const [isPaid, setIsPaid] = useState(false)
    const paypal = useRef()

    const createOrder =  (data, actions) => {
        
        return actions.order.create({
            purchase_units: [{
                amount: {value: parseFloat(total).toFixed(2)},
               
            }],
        })
    }

    const onSuccess = async (details, data)=> {

        //TODO:: place order
        //TODO:: empty cart
        setIsPaid(true)
      

        console.log(details)
        console.log(data)
        history.replace('/orders')
    }

    const onError = err => {
        console.log(err)
       
    }

    const onCancel = data => {
        console.log(data)

    }
   
 

    useEffect(() => {
   
      const addPaypal = async () => {
          try {
              const {data} = await axios.get('/api/paypal')
              const script = document.createElement('script')
              script.type = 'text/javascript'
              script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
              script.async = true;
              script.onload = () => {
                  setIsLoaded(true)
              }
              document.body.appendChild(script)

             
          } catch (error) {
              console.error(error)
          }
      }

      if (!window.paypal) {
        addPaypal()
      }

     

      return () => {
         console.log(window.paypal)
      }
     
    }, [total, isLoaded])



    return (
        <div className="summary" style={{display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center',  flex: 1, margin: 'auto', width: '90vw'}}>
            <h2 style={{textAlign: 'center', marginBottom: '10px'}}>Order Summary</h2>
            <Grid container>
                
                <Grid item xs={12} md={7}>
                    <Paper>
                    
                    <List>
                        {cartItems.map(item => {
                            const product = { ...item.product, qty: item.qty }
                            return <ListItem key={product._id}>
                                <CartListItem showIncreaser={false} product={product} />
                            </ListItem>
                        })}
                    </List>
                    <Divider light />
                    <div className="total bold" style={{padding: '15px 0px', display: 'flex', justifyContent: 'space-around'}} >
                    <p>Total Items: {quantity}</p>
                    <p>Grand Total: ${parseFloat(total).toFixed(2)}</p>
                    </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper style={{padding: '1rem'}}>
                        {shipping && (<>
                            <div style={{marginBottom: '8px'}}>
                            <h4 style={{paddingBottom: '8px'}}>Customer Info</h4>
                            <p className='capitalize py-3'>{shipping.name}  {shipping.lastName} </p>
                            <p className='capitalize py-3'>{shipping.phone}</p>
                            <p >{shipping.email}</p>
                        </div>
                        <div style={{marginBottom: '8px'}}>
                            <h4  style={{paddingBottom: '8px'}}>Shipping Address</h4>
                            <p className='capitalize py-3'>{shipping.address}  {shipping.apt} </p>
                            <p className='capitalize py-3'>{shipping.city}, {shipping.state} {shipping.zipcode}</p>
                        </div>

                            
                        </>)}
                    <div ref={paypal} className="payment_btn">
                   
                            {isLoaded && <PayPalButton disabled createOrder={createOrder} onButtonReady={() =>setIsLoaded(true)} onSuccess={onSuccess} onError={onError} onCancel={onCancel} />}
                    </div>
                    
                   
                    </Paper>
                </Grid>
            </Grid>
            </div>
    )
}

export default OrderSummary
