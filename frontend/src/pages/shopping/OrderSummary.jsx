import {
  Container,
  Grid,
  Paper,
  List,
  ListItem,
  Divider,
  Button,
  IconButton,
  CircularProgress,
  Backdrop,
  makeStyles,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartListItem from '../../components/CartListItem';
import { clearCart } from '../../reduxStore/actions/shoppingCart';
import axios from '../../utils/axios';
import { PayPalButton } from 'react-paypal-button-v2';
import Loader from '../../components/Loader';
import { Link, useHistory } from 'react-router-dom';
import Order from '../../models/Order';
import { placeOrder } from '../../reduxStore/actions/orderActions';
import EditIcon from '@material-ui/icons/Edit';

//const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const OrderSummary = () => {
  const classes = useStyles();
  const { cartItems, quantity, total } = useSelector((state) => state.cartData);
  const shipping = JSON.parse(localStorage.getItem('shippingAddress'));
  const [loadState, setLoadState] = useState({ loading: false, loaded: false });
  const [isPaid, setIsPaid] = useState(false);
  const [processing, setProcessing] = useState(false);
  const paypal = useRef();
  const { user } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const history = useHistory();

  const createOrder = (data, actions) => {
    setProcessing(true);
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: parseFloat(total).toFixed(2) },
        },
      ],
    });
  };

  const onSuccess = async (details, data) => {
    setIsPaid(true);
    const paymentDetails = {
      orderId: data.orderID,
      order_time: details.create_time,
      payer_id: details.payer.payer_id,
      email: details.payer.email_address,
      name: details.payer.name
        ? details.payer.name.given_name + ' ' + details.payer.name.surname
        : null,
      status: details.status,
      amount: details.purchase_units[0].amount.value,
    };
    const customer = JSON.parse(localStorage.getItem('shippingAddress'));

    const order = new Order(
      {
        name: customer.name + ' ' + customer.lastName,
        phone: customer.phone,
        email: customer.email,
      },
      {
        street: customer.address,
        apt: customer.apt,
        city: customer.city,
        state: customer.state,
        zipcode: customer.zipcode,
      },
      cartItems,
      parseFloat(total).toFixed(2),
      paymentDetails,
      true,
      paymentDetails.order_time,
      false,
      user ? user._id : null
    );

    if (details.status === 'COMPLETED') {
      const id = await dispatch(placeOrder(order));
      if (id) {
        dispatch(clearCart());

        history.replace(`/orders/${id}`);
        localStorage.removeItem('shippingAddress');
        setProcessing(false);
      }
    } else {
      return;
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const onCancel = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const addPaypal = async () => {
      try {
        const { data } = await axios.get('/api/paypal');
        console.log('client', data);
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
          setLoadState({ loading: false, loaded: true });
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error(error);
      }
    };

    if (!loadState.loading && !loadState.loaded) {
      setLoadState({ loading: true, loaded: false });
      addPaypal();
    }

    return () => {};
  }, [total, loadState.loaded]);

  if (loadState.loading) return <Loader />;

  return (
    <Paper
      style={{
        width: '90vw',
        margin: 'auto',
        padding: '10px 0',
        maxWidth: '1400px',
      }}
    >
      <div
        className='summary'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
          margin: 'auto',
          width: '100%',
        }}
      >
        <div
          className='top'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '10px 5px',
          }}
        >
          <Button
            color='secondary'
            variant='contained'
            component={Link}
            to='/cart'
          >
            Go to cart
          </Button>
          <h2>Order Summary</h2>
          <div />
        </div>

        <Grid container>
          <Grid item xs={12} md={7}>
            <Paper>
              <List>
                {cartItems.map((item) => {
                  const product = { ...item.product, qty: item.qty };
                  return (
                    <ListItem key={product._id}>
                      <CartListItem showIncreaser={false} product={product} />
                    </ListItem>
                  );
                })}
              </List>
              <Divider light />
              <div
                className='total bold'
                style={{
                  padding: '15px 0px',
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <p>Total Items: {quantity}</p>
                <p>Grand Total: ${parseFloat(total).toFixed(2)}</p>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper style={{ padding: '1rem' }}>
              {shipping && (
                <>
                  <div style={{ marginBottom: '8px' }}>
                    <h4 style={{ paddingBottom: '1px' }}>
                      Customer Info{' '}
                      <span style={{ marginLeft: '12px' }}>
                        <IconButton onClick={() => history.goBack()}>
                          <EditIcon htmlColor='red' />
                        </IconButton>
                      </span>
                    </h4>
                    <p className='capitalize py-3'>
                      {shipping.name} {shipping.lastName}{' '}
                    </p>
                    <p className='capitalize py-3'>{shipping.phone}</p>
                    <p>{shipping.email}</p>
                  </div>
                  <div style={{ margin: '8px 0px' }}>
                    <h4 style={{ paddingBottom: '8px' }}>Shipping Address</h4>
                    <p className='capitalize py-3'>
                      {shipping.address} {shipping.apt}{' '}
                    </p>
                    <p className='capitalize py-3'>
                      {shipping.city}, {shipping.state} {shipping.zipcode}
                    </p>
                  </div>
                </>
              )}
              <div ref={paypal} className='payment_btn'>
                {loadState.loaded && (
                  <PayPalButton
                    disabled
                    createOrder={createOrder}
                    onButtonReady={() =>
                      setLoadState({ loading: false, loaded: true })
                    }
                    onSuccess={onSuccess}
                    onError={onError}
                    onCancel={onCancel}
                  />
                )}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Backdrop className={classes.backdrop} open={processing}>
        <CircularProgress color='primary' />
      </Backdrop>
    </Paper>
  );
};

export default OrderSummary;
