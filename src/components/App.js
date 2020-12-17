import React, { useState, useEffect } from "react";
import { Products, NavBar, Cart, CheckOut } from "../components";
import { commerce } from '../lib/QuickCommerce'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
    const fetchProducts = async () => {
        const { data } = await commerce.products.list()
        setProducts(data)
    }
    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)
        setCart(item.cart)
    }
    const handleUpdateCartQuantity = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity })
        setCart(response.cart)
    }
    const handleRemoveCartItem = async (productId) => {
        const response = await commerce.cart.remove(productId)
        setCart(response.cart)
    }
    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty()
        setCart(response.cart)
    }
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
            setOrder(incomingOrder)
            refreshCart()
        } catch (error) {
            setErrorMessage(error.data.error.message)
        }
    }
   
    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])


    return (
        <Router>
            <NavBar totalItems={cart.total_items} />
            <Switch>
                <Route exact path="/">
                    <Products products={products} onAddtoCart={handleAddToCart} />
                </Route>
                <Route exact path="/cart">
                    <Cart cart={cart}
                        handleEmptyCart={handleEmptyCart}
                        handleRemoveCartItem={handleRemoveCartItem}
                        handleUpdateCartQuantity={handleUpdateCartQuantity}
                    />
                </Route>
                <Route exact path="/checkout">
                    <CheckOut
                        cart={cart}
                        order={order}
                        error={errorMessage}
                        onCaptureCheckout={handleCaptureCheckout}
                    />
                </Route>
            </Switch>

        </Router>
    );
};

export default App;
