import React, { useContext } from 'react';
import Particles from 'react-particles-js';
import Taskbar from 'src/components/Pages/Desktop/Taskbar';
import Window from 'src/components/Pages/Desktop/Window';
import { DesktopContext } from 'src/reducers/desktop';
import './desktop.scss';

const Desktop = () => {
  const [windowState, windowDispatch ] = useContext(DesktopContext);
  const  { isOpenWindow } = windowState;
  return (
    <>
      <Particles
        className="desktop"
        params={{
          fps_limit: 60,
          particles: {
            number: {
              value: 200,
              density: {
                enable: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 20,
              opacity: 0.5,
            },
            move: {
              speed: 0.3,
            },
            opacity: {
              anim: {
                enable: true,
                opacity_min: 0.05,
                speed: 2,
                sync: false,
              },
              value: 0.4,
            },
          },
          polygon: {
            enable: true,
            scale: 0.5,
            type: 'inline',
            move: {
              radius: 10,
            },
            url: 'src/small-deer.2a0425af.svg',
            inline: {
              arrangement: 'equidistant',
            },
            draw: {
              enable: true,
              stroke: {
                color: 'rgba(255, 255, 255, .2)',
              },
            },
          },
          retina_detect: false,
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'bubble',
              },
            },
            modes: {
              bubble: {
                size: 6,
                distance: 40,
              },
            },
          },
        }}
      />
      {isOpenWindow && <Window />}
      <Taskbar />
    </>
  );
};

export default Desktop;
