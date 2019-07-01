import React from 'react';
import { Provider } from 'react-redux';

import Header from './Components/Header/header.js';
import Artists from './Components/Top Artists/artists-card.js';
import Songs from './Components/Top Songs/songs-card.js';
import BarChartCard from './Components/BarChart/barchart-card';

import store from './store';

export default class Layout extends React.Component {

    render() {
        return (
        <Provider store={store}>
            <div>
                <Header />
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Artists />
                    <Songs />
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <BarChartCard />
                </div> 
            </div>
        </Provider>
        )
    }

}