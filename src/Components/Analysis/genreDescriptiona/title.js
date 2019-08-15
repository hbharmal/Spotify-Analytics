import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

export class Title extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const cleanedTitle = this.props.title.slice(0, 1).toUpperCase() + this.props.title.slice(1);

        return (
            <div style={{display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Card style={{width: '100%', height: '50%', borderRadius: '30px', background: 'aquamarine', borderStyle: 'double', borderColor: 'blue', borderWidth: '5px'}}>
                        <Typography align="center" variant="h6" style={{padding: "20px"}} >
                            {cleanedTitle}
                        </Typography>
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