import React from 'react';

const breadcrumb = [
    {
        text: 'Home',
        url: '/'
    },
    {
        text: 'To suppliers'
    }
]

const SuppliersComponent = () => {
    return (
        <React.Fragment>
            {/**<BreadCrumb breacrumb={breadcrumb} /> */}
            <div className="container" >
            </div>
        </React.Fragment>
    )
}

export default SuppliersComponent;