import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

export const ProfilePage = () => {

  return (
    <>
      <Parallax pages={3} style={{ top: '0', left: '0' }}>

        <ParallaxLayer
          offset={0}
          speed={1}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card sx={{ maxWidth: 700 }} raised={true}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Title
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The content of the card goes here.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={1}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
          }}>
          <Card sx={{ maxWidth: 700 }} raised={true}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Title
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The content of the card goes here.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </ParallaxLayer>

        <ParallaxLayer offset={1.5} speed={3} style={{ justifyContent: 'flex-start' }}>
          <img src="./images/hat.svg" style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={1}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
          }}>
          <Card sx={{ maxWidth: 700 }} raised={true}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Title
              </Typography>
              <Typography variant="body2" color="text.secondary">
                The content of the card goes here.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </ParallaxLayer>
      </Parallax>
    </>
  );
}

