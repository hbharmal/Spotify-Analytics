import React from 'react';
import Header from './Components/Header/header.js';
import Artists from './Components/Top Artists/artists-card.js';

export default class Layout extends React.Component {

    render() {

        return (
        <div>
            <Header />
            <div>
                <Artists />
            </div>
        </div>
        )
    }


}