import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import { dateFormater } from '../../../../helpers/formater';

class TableNotifications extends Component {
    render() {
        /* 
            You can change data by API
            example: https://ant.design/components/table/
        */
        const tableData = this.props.notifications;

        const tableColumn = [
            {
                title: 'Date Create',
                dataIndex: 'notification_date',
                render: text => <p>{dateFormater(text)}</p>
            },
            {
                title: 'Content',
                dataIndex: 'content',
            },
            {
                title: 'Category',
                dataIndex: 'category',
                render: text => (
                    <span>
                       <Tag key={text}>
                        {text.toUpperCase()}
                        </Tag>
                    </span>
                ),
            },
            {
                title : 'Readed' , 
                dataIndex : 'is_checked' , 
                render : (text,record)=>{
                    return (
                        <Tag key={text}>
                        {record.is_checked ? 'Readed' : 'New'}
                        </Tag>
                    )
                }
            },
            {
                title: 'Action',
                key: 'action',
                width: '200px',
                render: (text, record) => (
                    <span>
                        <a>Mark as read {record.notification_id}</a>
                    </span>
                ),
            },
        ];
        return <Table columns={tableColumn} dataSource={tableData} />;
    }
}

export default TableNotifications;
