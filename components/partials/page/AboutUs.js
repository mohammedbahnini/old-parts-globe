import React from 'react';
import BreadCrumb from '../../elements/BreadCrumb';



const AboutUs = () => {
    

        const breadcrumb = [
            {
                text : 'Home',
                url : '/'
            },
            {
                text : 'Abouts us',
                url : ''
            }
        ];
    
    
        return (
            <React.Fragment>
                <BreadCrumb breacrumb={breadcrumb} />
            <div className="ps-section--custom">
                
            <div className="container">
                <div className="ps-section__header">
    
                    
    
                    <h1>About us</h1>
                </div>
                <div className="ps-section__content">
                    <h3>Federal network of online parts stores</h3>

                    <div className="about-us-video">
                    <iframe
                        src="https://www.youtube.com/embed/M-J_uQkLPOU" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                    </iframe>

                    </div>

                    <p>
                    Appreciate your time and energy? Don't want to waste money? Then you will definitely appreciate the advantages of the company Era-Auto, which supplies and sells spare parts wholesale and retail for foreign cars.
                    </p>

                    <ul>
                        <li>
                        We will quickly and efficiently select spare parts for foreign cars for you: original or manufactured by a world licensed manufacturer.
                        </li>
                        <li>
                        We are fully responsible for the quality of sold auto parts, which means that you can always buy auto parts that are highly reliable.
                        </li>
                        <li>
                        Buying spare parts in our online auto parts store, you ensure the trouble-free operation of your vehicle in any operating conditions.
                        </li>
                    </ul>

                    <h3>How useful is our online auto parts store?</h3>
                    <p>
                    In the life of a modern person, a car occupies an important place, because it is precisely its presence that allows you to quickly move around the city on work and personal matters. But in order for the vehicle to be reliable, it needs to be systematically checked, provided with good maintenance and timely replacement of failed elements.
                    </p>
                    <p>
                    Parts sales are growing year by year, along with an increasing number of cars in the city. That is why many motorists are faced with the lack of required parts in stores. If you value your time and prefer to spend it profitably, then you should be well aware of all the advantages of online selection and purchase of spare parts wholesale and retail.
                    </p>

                    <p>
                    An online auto parts store is an ideal way to purchase spare parts for foreign cars. Online purchase gives you a lot of advantages:
                    </p>

                    <ul>
                        <li>
                        Reduces the time and effort that you usually spend searching for parts. You can choose and buy auto parts for foreign cars without leaving your home at any time convenient for you.
                        </li>
                        <li>
                        Easy search: our auto parts catalog is simple, intuitive and convenient. Having specified the necessary parameters, you can easily select the required part for your car.
                        </li>
                        <li>
                        Fast shipping. If the car urgently needs repair, we will deliver to the address indicated in the application, and you can not stop the repair work.
                        </li>
                        <li>
                        Various payment options. You can buy auto parts in our store both for cash and for bank transfer.
                        </li>
                        <li>
                        The price offer of our store of spare parts for foreign cars is really the best, besides we even have rare auto parts that are not available in other stores.
                        </li>
                        <li>
                        Quality assurance. Manufacturers of auto parts sold by our store provide impressive warranty periods for their products, which means you can always be sure of the quality.
                        </li>

                    </ul>
                    <p>
                    Our store of spare parts for foreign cars only works with reliable suppliers. That is why we always have a large selection, and you can buy auto parts at the best prices. 
                    </p>
                    
                    <h3>Our advantages</h3>
                    <p>
                    The selection and purchase of spare parts for foreign cars in the Era-Auto store will be the most profitable for you, because we:
                    </p>
                    <ul>
                        <li>
                        We sell products of leading manufacturers of auto parts. With us you can always pick up original or non-original spare parts for foreign cars.
                        </li>
                        <li>
                        We are constantly updating our product range, and therefore you can always purchase the required spare parts wholesale and retail.
                        </li>
                        <li>
                        We sell spare parts at affordable prices.
                        </li>
                        <li>
                        We provide guarantees for all products sold.
                        </li>
                        <li>
                        If necessary, we can deliver auto parts for foreign cars to a car service, in which your vehicle is repaired.
                        </li>
                        <li>
                        We sell spare parts for high-quality foreign cars, as well as related consumables, components and accessories of foreign and domestic production.
                        </li>
                        <li>
                        We carry out promotions and provide seasonal discounts to customers, and this allows us to save money on our purchases.
                        </li>


                    </ul>

                    <p>
                    In our store of spare parts for foreign cars, everything is created for the convenience of customers: quality service, a wide range, affordable prices and fast delivery. We value our customers and offer the most favorable conditions for purchases. Choosing spare parts for foreign cars in our online store - you choose quality! If you did not find the required spare part in the catalog, call us and we will select the right part or offer an original one.
                    </p>
                </div>
            </div>
        </div>
        </React.Fragment>
        )
}

export default AboutUs;
