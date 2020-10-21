import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import MiniCart from './MiniCart';
import AccountQuickLinks from './AccountQuickLinks';

class HeaderActions extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { compare, wishlist, auth } = this.props;
        return (
            <div className="header__actions">
                <MiniCart />
                <AccountQuickLinks />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(HeaderActions);
