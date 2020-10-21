import React, { Component, Fragment } from 'react';
import { Table, Divider, Tag } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { getClientData } from '../../../../helpers/auth';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

class TableOrders extends Component{

    constructor(props){
        super(props);
        this.state= {
            orders : []
        };
        console.log('props');
        console.log(this.props);
    }

    async componentDidMount(){
        const { id } = await getClientData();
        const orders = await axios.get(`${process.env.api}/order/get/${id}`);
        this.setState({orders :[...orders.data] });
    }

    static async getInitialProps(ctx) {
        console.log('get props');
        return { deal : [] };    
    }

    render(){
         const tableColumn = [
               
            {
                title: 'Date',
                dataIndex: 'OrderDate',
                align : 'center' ,
                render : (text)=>(
                    <span>{new Date(text).getDate()+'-'+new Date(text).getMonth()+'-'+ new Date(text).getFullYear()}</span>
                )
            },
            {
                title: 'Amount',
                dataIndex: 'Amount',
                render: (text, record) => (
                    <span className="text-right">${record.Amount}</span>
                ),
                align : 'center'
            },
            {
                title: 'Status',
                dataIndex: 'Received',
                render: (text,record) => (
                    <Fragment>
                        {record.Received ? 
                        (
                            <Tag color="#87d068">
                            Received
                            </Tag>
                        ):
                        ( 
                            <Tag color="#108ee9">
                            New
                            </Tag>)
                      }
                    </Fragment>
                ),
                align : 'center'
            },
            {
                title : 'Recieved At' , 
                align : 'center' ,
                dataIndex : 'ReceivedAt',
                render : (text,record)=>(
                    <span>{record.ReceivedAt}</span>
                )
            } ,
            {
                title : 'Detail' , 
                align : 'center' , 
                key : 'detail' ,
                render : (text,record)=>(
                    <Link href={`/account/order-detail?orderID=${record.IdOrder}`}>
                        <a>Detail</a>
                    </Link>
                )
            }
        ];
        return (
            <Fragment>
                {true && (
                    <Table 
            columns={tableColumn}
            dataSource={this.state.orders}
            rowKey={(record)=> record.IdOrder}
            />
                )}
            
            </Fragment>
            
        );
    }

}

export default TableOrders;