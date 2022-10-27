// @ts-nocheck

import React from 'react';
import styled from 'styled-components';

import {atom, selector, selectorFamily} from "recoil";
import { recoilPersist } from 'recoil-persist';

export const backgroundState = atom({
  key: "background",
  default: 'https://www.youtube.com/embed/YDodPhpFF9A'
});


interface Test {}

const Background: Test = () => {
  const [background, setBackground] = useRecoilState(backgroundState)
  return (
    <>
      <VideoPlayer>
        <PlayerContainer>
          <PlayerContainer2>
            <iframe
              src={`${background}?autoplay=1&mute=1&controls=0&loop=1&modestbranding=1&disablekb=1&playsinline=1&showinfo=0&iv_load_policy=3&enablejsapi=1s&allowfullscreen=1&frameborder=0`}
              height="100%"
              width="100%"
            ></iframe>
          </PlayerContainer2>
        </PlayerContainer>
      </VideoPlayer> 
    </>
  );
};

const VideoPlayer = styled.div`
  position: fixed;
  z-index: -1;
  top: -12%;
  left: 0;
  overflow: hidden;
  user-select: text;
  width: 100vw;
  height: 100vh;
`;

const PlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  max-aspect-ratio: 16 / 9;
`;

const PlayerContainer2 = styled.div`
  position: fixed;
  pointer-events: none;
  top: 50%;
  left: 50%;
  width: 110vmax; 
  height: 110vmax;
  transform: translate(-50%, -50%);
  @media (max-aspect-ratio: 16 / 9) {
    width: 177.78vh !important;
    height: 120% !important;
  }
`;

export default Background;
