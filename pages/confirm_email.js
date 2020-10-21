import React from 'react';
import HeaderDefault from '../components/shared/headers/HeaderDefault';
import FooterFullwidth from '../components/shared/footers/FooterFullwidth';
import HeaderMobile from '../components/shared/headers/HeaderMobile';
import NavigationList from '../components/shared/navigation/NavigationList';
import VerifyEmail from '../components/VerifyEmail';
import axios from 'axios';


const ConfirmEmail = (props) => {
    const message = props.message;
   return(
        <div className="site-content">
        <HeaderDefault />
        <HeaderMobile />
        <NavigationList />

        <main id="homepage-1">
            <VerifyEmail message={message} />
        </main>
        <FooterFullwidth />
        </div>
   )

}

export async function getServerSideProps(ctx){
    // this is async because we try to verif the eamil in the server then just pass a message to the main component
    const { token }= ctx.query;
    
    // try confirm email
    const { data } = await axios.post(`${process.env.api}/user/confirm-email`,{token});
    return { props : { message : data}};
}



/*ConfirmEmail.getInitialProps = async (ctx)=>{
    // this is async because we try to verif the eamil in the server then just pass a message to the main component
    const { token }= ctx.query;
    
    // try confirm email
    const { data } = await axios.post(`${process.env.api}/user/confirm-email`,{token});
    return { message : data };
}*/


export default ConfirmEmail;
