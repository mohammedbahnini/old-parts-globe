import React, { Component } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableOrders from './modules/TableOrders';
import { Table , Tag } from 'antd';
import Link from 'next/link';

class Orders extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                    <>
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
                    </>
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
        const { orders } = this.props;
        return (
            <section className="ps-my-account ps-page--account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-section__left">
                                <AccountMenuSidebar activeLink='Orders' />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-page__content">
                                <div className="ps-section--account-setting">
                                    <div className="ps-section__header">
                                        <h3>Orders</h3>
                                    </div>
                                    <div className="ps-section__content">
                                    <Table 
                                        columns={tableColumn}
                                        dataSource={orders}
                                        rowKey={(record)=> record.IdOrder}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Orders;
