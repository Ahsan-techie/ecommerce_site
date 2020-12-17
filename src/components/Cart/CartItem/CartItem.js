import React from 'react'
import { Typography, Button, Card, CardMedia, CardActions, CardContent } from '@material-ui/core'
import useStyle from './style'

const CartItem = ({ item,onUpdateCartQuantity,onRemoveCartItem }) => {
    const classes = useStyle()
    return (
        <Card>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>

            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={()=>onUpdateCartQuantity(item.id,item.quantity-1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" size="small" onClick={()=>onUpdateCartQuantity(item.id,item.quantity+1)}>+</Button>

                </div>
                <Button type="button" variant="contained" color="secondary" onClick={()=>onRemoveCartItem(item.id)}>Remove</Button>
            </CardActions>

        </Card>
    )
}

export default CartItem
