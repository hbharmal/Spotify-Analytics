import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

export class Title extends React.Component {

    render() {

        return (
            <div style={{display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Card style={{width: '100%', height: '50%', borderRadius: '30px', background: 'aquamarine'}}>
                    <CardContent style={{height: '20%', background: 'coral'}}>
                        <Typography align="center" variant="h6" >
                            Electronic Music
                        </Typography>
                    </CardContent>
                    {/* <CardActions style={{height: '35%', justifyContent: 'center'}}>
                        <Button size="small" style={{fontSize: 'x-small'}} variant="raised">
                            Learn More
                        </Button>
                    </CardActions> */}
                </Card>
            </div>
        )


    }
}

export default Title;