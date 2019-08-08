import React from 'react';

import Typography from '@material-ui/core/Typography';

export class PercentageCircle extends React.Component {

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', height: '100%'}}>
                <div style={{justifyContent: 'center', alignSelf: 'center', width: '100%'}}>
                    <svg width="150px" height="140px" style={{display:"block", margin:"0 auto"}}>
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{stopColor: "rgb(255,255,0)", stopOpacity: 1}} />
                            <stop offset="100%" style={{stopColor: "rgb(255,0,0)", stopOpacity: 1}} />
                        </linearGradient>
                    </defs>
                        <circle cx="75" cy="70" r="60" fill="url(#grad1)"
                        />
                        <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fontSize="25">
                            144 songs
                        </text>
                    </svg>
                </div>
            </div>
        )
        
    }
}

export default PercentageCircle;