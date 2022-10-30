// @ts-nocheck

import React, { useEffect, useState } from 'react';
import RoomStyle from '../../styles/RoomLayout.module.css';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styled from '@emotion/styled';

interface Test {}
const roomTitle = '공부할사람';
const theme = '크리스마스';

const RoomItems: Test = ({ roomNum, roomInfo }) => {
  const [roomUrl, setRoomUrl] = useState('');
  useEffect(() => {
    setRoomUrl(JSON.parse(localStorage.getItem('roomUrl')));
  }, []);
  return (
    <>
      <Link href={`/studyroom/${roomUrl[roomNum]}`}>
        <RoomDiv>
          <Button
            variant="outlined"
            color="primary"
            className={RoomStyle.roomBtn}
            onClick={enterRoom}
          >
            <div className={RoomStyle.roomRow}>
              <h3 className={RoomStyle.roomTypo}>방제목</h3>
              <div className={RoomStyle.roomContent}>{roomTitle}</div>
            </div>
            <div className={RoomStyle.roomRow}>
              <h3 className={RoomStyle.roomTypo}>방 테마</h3>
              <div className={RoomStyle.roomContent}>{theme}</div>
            </div>
          </Button>
        </RoomDiv>
      </Link>
    </>
  );
};

function enterRoom() {
  console.log('눌렸음');
}

export default RoomItems;

const RoomDiv = styled.div({
  display: 'flex',
  justifyContent: 'center'
});
