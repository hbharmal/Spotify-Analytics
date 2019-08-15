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

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            hover: ''
        };

        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
        this.handleImageClick = this.handleImageClick.bind(this);
    }

    handleLeftClick() {
        this.setState({
            currentIndex: this.state.currentIndex - 1
        });
    }

    handleRightClick() {
        this.setState({
            currentIndex: this.state.currentIndex + 1
        });
    }

    handleImageClick(url) {
        window.open(url, '_blank');
    }



    render() {

        const currentArtist = this.props.artists[this.state.currentIndex];

        return (
            <Card style={{width: '100%', height: '100%', borderRadius: '200px 20px 0px 0px'}}>
                <CardHeader title="Top Artists" style={{textAlign: 'right', background: 'cadetblue'}}/>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '60%'}}>
                    <Fab disabled={this.state.currentIndex == 0 ? true : false}
                        style={{height: '10px', width: '36px'}} 
                        onClick={() => this.handleLeftClick()}
                    >
                        <NavigateBefore />
                    </Fab>
                    <CardMedia
                        image={currentArtist.imageUrl}
                        style={{borderRadius: '50%', height: '180px', width: '180px', margin: '0px 15px 0px 15px'}}
                        onClick={() => this.handleImageClick(currentArtist.externalUrl)}
                    />
                    <Fab disabled={this.state.currentIndex == 3 ? true : false}
                        style={{height: '10px', width: '36px'}} 
                        onClick={() => this.handleRightClick()}
                    >
                        <NavigateNext />
                    </Fab>
                </div>
                <CardContent style={{padding: '0px'}}>
                    <Typography align="center" variant="h6">{currentArtist.artist}</Typography>
                    <Typography align="center" variant="caption">Populatiy: {currentArtist.popularity}%</Typography>
                </CardContent>
            </Card>
        )
        
    }
}

export default GenreTopArtists;