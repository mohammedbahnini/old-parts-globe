import React from 'react';
import BreadCrumb from '../../elements/BreadCrumb';



const ContactComponent = () => {
    

        const breadcrumb = [
            {
                text : 'Home',
                url : '/'
            },
            {
                text : 'Contact us',
                url : ''
            }
        ];
    
    
        return (
            <React.Fragment>
                <BreadCrumb breacrumb={breadcrumb} />
            <div className="ps-section--custom">
                
            <div className="container">
                <div className="ps-section__header">
    
                    
    
                    <h1>Contact us</h1>
                </div>
                <div className="ps-section__content">
                    <h3>Ufa, st. R. Sorge 8</h3>
                    <p><b>Address :</b>  Ufa, st. R. Sorge d.8 </p>
                    <p><b>Phone:</b> 
                    <a href="tel:+7 (987) 254-17-18"> +7 (987) 254-17-18</a> / <a href="tel:+7 (917) 40-700-40"> +7 (917) 40-700-40</a> 
                    </p>
                    <p>
                        <b>Email :</b> <a href="mailto:info@era-auto.ru">info@era-auto.ru</a>
                    </p>
                    <p>
                        <b>Mode work :</b> Mon-Fri from 10-00 to 19-00, Sat from 10-00 to 16-00, Sun off
                    </p>

                    <hr/>

                    <h3>Details : </h3>
                    <p>Individual entrepreneur: Ganiatullin R.S.</p>
                    <p><b>TIN :</b> 027901323299</p>
                    <p><b>OGRNIP :</b> 319028000173687</p>
                    <p><b>Bank details :</b> account 40802810606000042022</p>
                    <p>at the bank of PJSC Sberbank account number 30101810300000000601 BIK 048073601</p>


                </div>

               

            </div>
        </div>
        </React.Fragment>
        )
}

export default ContactComponent;
