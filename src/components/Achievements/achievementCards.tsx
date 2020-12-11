import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { addScoreActionCreator } from '../../store';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 10,
    marginBottom: 40,
    marginRight: 40,
  },
});

interface ImgMediaCardProps {
  name: string;
  image: string;
}

export default function ImgMediaCard({ name, image }: ImgMediaCardProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // give 25 points by default
  const givePoints = () => {
    dispatch(
      addScoreActionCreator({
        points: 50,
      }),
    );
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            givePoints();
          }}
        >
          Clip
        </Button>
        <Button size="small" color="primary">
          50XP
        </Button>
      </CardActions>
    </Card>
  );
}
