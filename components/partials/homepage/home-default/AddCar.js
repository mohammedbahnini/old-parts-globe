import React , { Component} from 'react';
import { Select } from 'antd';


const { Option } = Select;

/* this compenet contains 4 elements

1 car select 
2 model select 
3 specification
4 btn search

*/


class AddCar extends Component {









    onCarSearch(e){
        console.log(e.target.value);
    }


    render(){
        return (
           <div className="ps-container">

            <div className=" ps-breadcrumb vehicule-breadcrumb">

                <div className="vehicule-search-heading">
                    <h3>Add vehicule to find exact patrs </h3>
                </div>

               <div className="vehicule-search-body"  >

                <div className="car-select" >
                        <Select 
                        showSearch
                        style = { {width : '100%' }}
                        placeholder="Add a vehicule"
                        filterOption ={
                            (input , option)=> {
                                return option.props.children.toLowerCase().includes( input.toLowerCase() ) ;
                            }
                        }
                        >
                            <Option key='Audi'>Audi</Option>
                        </Select>
                    </div>

                    <div className="model-select">
                        <Select 
                        showSearch
                        style = { {width : '100%' }}
                        placeholder="Add a vehicule"
                        filterOption ={
                            (input , option)=> {
                                return option.props.children.toLowerCase().includes( input.toLowerCase() ) ;
                            }
                        }
                        >
                            <Option key='Audi'>Audi</Option>
                        </Select>
                    </div>


                    
                    <div className="model-number-select">
                        <Select 
                        showSearch
                        style = { {width : '100%' }}
                        placeholder="Add a vehicule"
                        filterOption ={
                            (input , option)=> {
                                return option.props.children.toLowerCase().includes( input.toLowerCase() ) ;
                            }
                        }
                        >
                            <Option key='Audi'>Audi</Option>
                        </Select>
                    </div>

                    <div className="vehicule-submit">
                        <button className="ps-btn" > 
                        <i className="icon-magnifier"></i> Search
                        </button>
                    </div>

               </div>

            </div>
               
               


           </div>
        )
    }
}

export default AddCar;