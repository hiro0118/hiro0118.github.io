import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Card as CustomCard } from '../../components/card/Card';

export const ProfilePage = () => {

  return (
    <>
      <Parallax pages={3} style={{ top: '0', left: '0' }}>

        <ParallaxLayer
          offset={0}
          speed={1}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CustomCard title='title1' content='content1' />
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
          <CustomCard title='Education' content='content2' />
        </ParallaxLayer>

        <ParallaxLayer offset={1.5} speed={3} style={{ justifyContent: 'flex-start' }}>
          <img src="/public/images/hat.svg" style={{ display: 'block', width: '30%', marginLeft: '60%' }} />
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
          <CustomCard title='title3' content='content3' />
        </ParallaxLayer>
      </Parallax>
    </>
  );
}

