import React,{Component} from 'react';
import { Alert } from 'antd';

class VerifyEmail extends Component{
    render(){
        
        const { message } = this.props;
        return (
                <div className="container">

                   <div style={{paddingTop : '150px' , paddingBottom : '150px'}}>
                    <Alert 
                        type={message.type}
                        message={message.title}
                        description={message.text}
                        showIcon
                    />
                   </div>
                </div>
            
        )
    }
}

export default VerifyEmail;