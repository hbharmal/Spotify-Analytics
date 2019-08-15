import React from 'react';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader';

export class Description extends React.Component {

    render() {

        return (
            <Card style={{width: '100%', height: '100%', borderRadius: '20px 200px 0px 0px'}}>
                <CardHeader title="Description" style={{textAlign: 'left', background: 'cadetblue'}} />
                <CardActions>
                    <Button size="small" >
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        )
        
        
    }

}

export default Description;