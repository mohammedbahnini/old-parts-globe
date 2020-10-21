import React, { Component } from 'react';
import ProductItem from './ProductItem';


class ProductList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const  products  = this.props.products;
        
        return (
           
            <React.Fragment>
                <table className="product-list">
                    <thead>
                        <tr>
                            <th className="product-detail-col">Detail</th>
                            <th className="text-center">Warehouse</th>
                            <th className="text-center">Count</th>
                            <th className="text-center">Terme</th>
                            <th className="text-center">Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(item=>{
                            return <ProductItem product={item} key={item.id} />
                        })}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}


export default ProductList;
