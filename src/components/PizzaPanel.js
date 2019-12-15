import React, { useState, useEffect } from 'react';
import data from '../data/toppings';
import { Link } from 'gatsby';
import PizzaModal from './PizzaModal';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const PizzaPanel = (props) => {
    const [btnValue, setBtnValue] = useState([]);

    useEffect(() => {
        props.data.pizzaOrderStart();
    }, [])

    const addPizzaToCart = () => {
        props.data.addToCart();
    }

    const handleChange = val => setBtnValue(val);

    const add = (a, b) => {
        return a + b
    }
    
    const orderTotal = props.data.pendingCost.reduce(add)

    const mappedToppings = data.ToppingData.map((topping) => {
        return (
            <ToggleButton value={topping.id} onClick={((e) => props.data.handlePizzaClick(e, topping))}>{topping.name}</ToggleButton>
        );
    });

    return (
        <>
            <ButtonToolbar>
                <ToggleButtonGroup className="mx-auto" type="checkbox" value={btnValue} onChange={handleChange}>
                    {mappedToppings}
                    <ToggleButton value="1" onClick={((e) => props.data.pizzaOrderStart())}>Clear</ToggleButton>
                </ToggleButtonGroup>
            </ButtonToolbar>
            <div className="text-white text-center mt-3">
                <h3 className="text-center">${orderTotal}</h3>
            </div>
            <div className="text-white text-center mt-3">
                <PizzaModal addToCart={props.data.addToCart}/>
                {/* <Button onClick={ addPizzaToCart } className="mr-3">Add to Cart</Button> */}
                <Link className="nav-link-gatsby text-white" to="/account/billing">Checkout</Link>{" "}
            </div>
        </>
    )
}

export default PizzaPanel