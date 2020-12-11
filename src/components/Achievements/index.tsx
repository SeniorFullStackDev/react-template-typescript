import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import ImgMediaCard from './achievementCards';
import pioneer from '../../images/pioneer.jpg';
import dexer from '../../images/dexer.PNG';
import quickdraw from '../../images/bullseye.jpg';
import noluck from '../../images/luck.png';

export default function Achievements() {
  const { trackPageView } = useMatomo();

  // Track page view
  useEffect(() => {
    trackPageView({});
  }, []);

  //   const handleOnClick = () => {
  //   // Track click on button
  //   trackEvent({ category: 'achievement-page', action: 'click-pioneer' })
  // }

  return (
    <Container>
      <Grid container justify="center">
        <Grid container item sm={12} md={4} lg={4} spacing={3}>
          <ImgMediaCard name="Pioneer" image={pioneer} />
        </Grid>
        <Grid container item sm={12} md={4} lg={4} spacing={3}>
          <ImgMediaCard name="Dexer" image={dexer} />
        </Grid>
        <Grid container item sm={12} md={4} lg={4} spacing={3}>
          <ImgMediaCard name="Quick Draw" image={quickdraw} />
        </Grid>
        <Grid container item sm={12} md={4} lg={4} spacing={3}>
          <ImgMediaCard name="No Luck" image={noluck} />
        </Grid>
      </Grid>
    </Container>
  );
}
