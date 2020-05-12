import React, { useEffect, useState } from 'react';
import Particles from 'react-particles-js';
import AppsIcon from '@material-ui/icons/Apps';
import './desktop.scss';

const Desktop = () => {
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  const currentDate = `${hour}:${minutes}`;
  const [ count, setCount ] = useState(0);
  const [date, setDate ] = useState(currentDate);

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
      setDate(currentDate);
    }, 1000);
  },[count])
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
      <div className="desktop-taskbar">
        <div className="desktop-taskbar-user">
          <AppsIcon className="desktop-taskbar-user-icon" />
        </div>
        <div className="desktop-taskbar-date">
          <p className="desktop-taskbar-date-hour">{date}</p>
        </div>
      </div>
    </>
  );
};

export default Desktop;
