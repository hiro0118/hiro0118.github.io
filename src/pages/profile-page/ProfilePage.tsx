import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Card } from '../../components/card/Card';

const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`


export const ProfilePage = () => {

  return (
    <>
      <Parallax pages={3} style={{ top: '0', left: '0' }}>

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundColor: '#0d1117'
          }}
        >
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={1}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card title='title1' content='content1' />
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
          <Card title='Education' content='content2' />
        </ParallaxLayer>

        <ParallaxLayer offset={1.5} speed={3} style={{ justifyContent: 'flex-start' }}>
          <img src="/images/hat.svg" style={{ display: 'block', width: '30%', marginLeft: '60%' }} />
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
          <Card title='title3' content='content3' />
        </ParallaxLayer>
      </Parallax>
    </>
  );
}

