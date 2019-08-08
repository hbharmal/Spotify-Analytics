import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Fab from '@material-ui/core/Fab';

export class GenreTopArtists extends React.Component {

    render() {

        return (
            <Card style={{width: '100%', height: '100%', borderRadius: '200px 20px 0px 0px'}}>
                <CardHeader title="Top Artists" style={{textAlign: 'right', background: 'cadetblue'}}/>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '60%'}}>
                    <Fab disabled="true" style={{height: '10px', width: '36px'}}>
                        <NavigateBefore />
                    </Fab>
                    <CardMedia
                        image="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2019%2F08%2Ffuture-young-thug-gunna-lil-baby-super-slimey-2-project-album-1.jpg?q=90&w=1400&cbr=1&fit=max"
                        style={{borderRadius: '50%', height: '180px', width: '180px', margin: '0px 15px 0px 15px'}}
                        
                    />
                    <Fab style={{height: '10px', width: '36px'}}>
                        <NavigateNext />
                    </Fab>
                </div>
                <CardContent style={{padding: '0px'}}>
                    <Typography align="center" variant="h6">Young Thug</Typography>
                    <Typography align="center" variant="caption">Populatiy 98%</Typography>
                </CardContent>
            </Card>
        )
        
    }
}

export default GenreTopArtists;