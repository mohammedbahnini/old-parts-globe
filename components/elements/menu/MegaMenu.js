import React, { Component } from 'react';

import Link from 'next/link';

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    getKey = () => {
        const key = Math.floor(Math.random() * 9999999) + 1;
        return key;
    }


    render() {
        const { menuData } = this.props;

        return (
            <li className={menuData.megaContent ? 'menu-item-has-children has-mega-menu' : ''}>
                {menuData.type === 'dynamic' ? (
                    <Link
                        href={`${menuData.url}/[pid]`}
                        as={`${menuData.url}/${menuData.endPoint}`}>
                        <a>{menuData.text}</a>
                    </Link>
                ) : (
                        <Link href={menuData.url} as={menuData.url}>
                            <a>{menuData.text}</a>
                        </Link>
                    )}
                <div className="mega-menu">
                    {menuData &&
                        menuData.megaContent.map(megaItem => (
                            <div className="mega-menu__column" key={this.getKey()}>
                                {megaItem.heading && <h4>{megaItem.heading}</h4>}
                                <ul className="mega-menu__list">
                                    {megaItem.megaItems.map(megaSubItem => (

                                        <li key={this.getKey()}>
                                            {megaSubItem.type === 'dynamic' ? (
                                                <Link
                                                    href={`${megaSubItem.url}/[pid]`}
                                                    as={`${megaSubItem.url}/${megaSubItem.endPoint}`}>
                                                    <a>{megaSubItem.text}</a>
                                                </Link>
                                            ) : (
                                                    <Link href={megaSubItem.url} as={megaSubItem.url}>
                                                        <a>{megaSubItem.text}</a>
                                                    </Link>
                                                )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                </div>
            </li>
        );
    }
}

export default Menu;
