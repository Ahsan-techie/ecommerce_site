import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyle from './Style'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'

const Cart = ({ cart,handleEmptyCart,handleRemoveCartItem,handleUpdateCartQuantity }) => {


    const classes = useStyle()


    const EmptyCart = () => {
        return (
            <Typography variant="subtitle1">You have no items in your shopping cart,
                <Link to="/" className={classes.link}> start adding some!</Link>!</Typography>
        )
    }
    const FilledCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} onRemoveCartItem={handleRemoveCartItem} onUpdateCartQuantity={handleUpdateCartQuantity} />
                        </Grid>

                    ))}

                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant="h4">SubTotal:{cart.subtotal.formatted_with_symbol}</Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" onClick={handleEmptyCart} type="button" color="secondary" variant="contained">Empty Cart</Button>
                        <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" color="primary" variant="contained">Checkout</Button>

                    </div>
                </div>
            </>)
    }
    if (!cart.line_items) return "Loading..."

    return (

        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom> Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
