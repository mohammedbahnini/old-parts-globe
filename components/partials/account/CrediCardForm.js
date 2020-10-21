import React,{Component} from 'react';
import {CardNumberElement, CardCvcElement  , CardExpiryElement , ElementsConsumer} from '@stripe/react-stripe-js';

const customStyle = {
    style: {
        base: {
            fontSize: '14px'
        },
        invalid: {
          color: '#c23d4b',
        }
      }
}

const containerInputStyle = {
    padding : '18px',
    border : '1px solid #ccc',
    borderRadius : '4px',
    width : '100%'
}


class CreditCardForm extends Component{

    

    render(){
        return (
           <>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                            <div style={containerInputStyle}>
                                <CardNumberElement options={customStyle}/>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                            <div style={containerInputStyle}>
                                <CardExpiryElement options={customStyle}/>
                            </div>
                        </div>
                    </div>
                    

                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                            <div style={containerInputStyle}>
                                <CardCvcElement options={customStyle}/>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
           </>
        )
    }
}

const InjectedCreditCardForm = ()=>{
    return (
        <ElementsConsumer>
            {({stripe, elements}) => (
                <CreditCardForm  stripe={stripe} elements={elements} />
            )}
        </ElementsConsumer>
    )
}


export default InjectedCreditCardForm;