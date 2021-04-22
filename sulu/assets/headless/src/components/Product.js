import React, {useContext, useEffect, useState} from 'react';
import CartContext from '../contexts/CartContext';
import shopRequester from '../services/shopRequester';
import {addItemToCart} from '../services/cart';

export default ({
    code,
    image,
    name,
    description,
    price,
}) => {
    const [cart, setCart] = useContext(CartContext);

    const [product, setProduct] = useState();
    const [firstVariant, setFirstVariant] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        shopRequester.get('/api/v2/shop/products/' + code)
            .then((data) => {
                shopRequester.get(data.variants[0])
                    .then(setFirstVariant)
                    .then(() => setLoading(false));

                return data;
            })
            .then(setProduct);
    }, []);

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
                <img className="card-img-top" src={image} alt=""/>
                <div className="card-body">
                    <h4 className="card-title">
                        {name}
                    </h4>
                    <h5>$ {price}</h5>
                    <p className="card-text">
                        {description}
                    </p>

                    <button
                        disabled={!cart || loading}
                        className="btn btn-primary"
                        onClick={() => addItemToCart(cart.tokenValue, code, firstVariant.code, 1).then(setCart)}
                    >
                        Put into cart
                    </button>
                </div>
            </div>
        </div>
    );
};
