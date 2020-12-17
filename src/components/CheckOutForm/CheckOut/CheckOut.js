import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Button, Typography, CircularProgress, Divider,CssBaseline } from '@material-ui/core'
import useStyle from './styles'
import { Link,useHistory } from 'react-router-dom'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'

import { commerce } from '../../../lib/QuickCommerce'


const CheckOut = ({ cart, order, error, onCaptureCheckout }) => {
    const steps = ['Shipping Address', 'Payment Details']
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const [isFinished,setIsFinished] = useState(false)
    const history = useHistory()
    const classes = useStyle()
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                setCheckoutToken(token)
            } catch (error) {
                history.pushState("/")
            }
        }; generateToken();
    }, [cart])
    const timeout=()=>{
        setTimeout(() => {
            setIsFinished(true)
        }, 3000);
    }
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
    const next = (data) => {
        setShippingData(data)
        nextStep()
    }
    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm timeout={timeout} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken} shippingData={shippingData} backStep={backStep} />
    let Confirmation = () => order.customer ?
        (
            <>
                <div>
                    <Typography variant="h5">
                        Thank you For Your Purchase, {order.customer.firstname} {order.customer.lastname} lastName
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle2">Order Ref : {order.customer_reference}</Typography>
                </div>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </>
        )
        :isFinished?(
            <>
                <div>
                    <Typography variant="h5">
                        Thank you For Your Purchase,
                    </Typography>
                    <Divider className={classes.divider} />
                    
                </div>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </>
        ): (
            <div className={classes.spinner}>
                <CircularProgress />

            </div>
        )
        if(error){
            <>
                <Typography variant = "h5">Error : {error}</Typography>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </>
        }
    return (
        <>
        <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? Confirmation() : checkoutToken && <Form />}

                </Paper>

            </main>

        </>
    )
}

export default CheckOut
