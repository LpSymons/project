import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    basket: { postalAddress, paymentMethod },
  } = state;

  const [paymentMethodType, setPaymentMethod] = useState(
    paymentMethod || 'Paypal'
  );
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'save_payment_info', payload: paymentMethodType });
    localStorage.setItem('paymentMethod', paymentMethodType);
    navigate('/placeorder');
  };
  return (
    <div>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <h1 className="my-3">Paymemt Method</h1>
      <Form onSubmit={submitHandler}>
        <div className="mb-3">
          <Form.Check
            type="radio"
            id="PayPal"
            label="Paypal"
            value="Paypal"
            checked={paymentMethodType === 'Paypal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </div>
        <div className="mb-3">
          <Form.Check
            type="radio"
            id="Card"
            label="Card"
            value="Card"
            checked={paymentMethodType === 'Card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </div>
        <div className="mb-3">
          <Button type="submit">Payment</Button>
        </div>
      </Form>
    </div>
  );
}
