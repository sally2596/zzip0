// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  makeSocketConnection,
  socketClient
} from '../../component/socket/SocketClient';
import { callback } from '../../component/socket/SocketUtils';
//recoil
import { userState } from '../../lib/recoil/member';
import { useRecoilState } from 'recoil';
import { getUser } from '../../lib/api/member';
import { roomInfoAPI } from '../../lib/api/room';
import { myroomState } from '../../lib/recoil/room';
import { backgroundBEState } from '../../lib/recoil/background';
import { myRoomPeopleState } from '../../lib/recoil/room';
import { chatState } from '../../lib/recoil/chat';

//component
import Background from '../../component/studyroom/Background/Background';
import Timer from '../../component/studyroom/Timer/Timer';
import TodoList from '../../component/studyroom/Todo/TodoList';
import Dday from '../../component/studyroom/Dday/Dday';
import SideBar from '../../component/studyroom/SideBar/SideBar';
import WhiteNoise from '../../component/studyroom/WhiteNoise/WhiteNoise';
import Memo from '../../component/studyroom/Memo/Memo';
import ChatWidgetView from '../../component/studyroom/SideBar/Chat/ChatWidgetView';
import { connect } from 'http2';

interface Test {}

const StudyRoom: Test = () => {
  const router = useRouter();
  const roomUrl = router.query;
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [roomInfo, setRoomInfo] = useRecoilState(myroomState);
  const [socketConnection, setSocketConnection] = useState('');
  const [backgroundBE, setBackgroundBE] = useRecoilState(backgroundBEState);
  const [onlines, setOnlines] = useRecoilState(myRoomPeopleState);
  const [datas, setDatas] = useRecoilState(chatState);

  const getUserInfo = () => {
    console.log('이게?17711');
    getUser().then((res) => {
      setUserInfo(res);
    });
  };

  const socketCallback = (message) => {
    console.log('이게?1666');
    let recv = JSON.parse(message.body);
    switch (recv.roomAction) {
      case 'ENTER':
        console.log('입장');
        const enterMsg = { ENTER: `${recv.sender}님이 입장하셨습니다.` };
        setDatas((datas) => [...datas, enterMsg]);
        setOnlines((onlines) => [...onlines, recv.sender]);
        roomInfoAPI(roomUrl['roomUrl']).then((res) => {
          setRoomInfo(res.data);
          setBackgroundBE(res.data.background);
        });
        break;
      case 'EXIT':
        console.log('퇴장');
        const exitMsg = { EXIT: `${recv.sender}님이 퇴장하셨습니다.` };
        setDatas((datas) => [...datas, exitMsg]);
        setOnlines((onlines) =>
          onlines.filter((online) => online !== recv.sender)
        );
        break;
      case 'CHAT':
        console.log('Chat');
        let newchat = {};
        if (recv.sender === userInfo.data.memberName) {
          newchat['MYCHAT'] = recv.message;
        } else {
          newchat['YOURCHAT'] = [recv.sender, recv.message];
        }
        const chatMsg = { CHAT: newchat };
        console.log('chat msssgg', chatMsg);
        setDatas((datas) => [...datas, chatMsg]);
        break;
      case 'BACKGROUND':
        console.log('이거 실행되면 안대');
        setBackgroundBE(recv.bg);
        break;
    }
  };

  useEffect(() => {
    console.log('이게?555');
    if (userInfo.data && !socketConnection && roomUrl.roomUrl) {
      const connectionConst = socketClient();
      connectionConst.connectHeaders = {
        userEmail: userInfo.data.email,
        roomUrl: roomUrl['roomUrl']
      };
      connectionConst.onConnect = function (frame) {
        connectionConst.subscribe(
          `/topic/room/${roomUrl['roomUrl']}`,
          socketCallback
        );
        connectionConst.publish({
          destination: '/app/room',
          body: JSON.stringify({
            sender: userInfo.data.memberName,
            roomId: roomUrl['roomUrl'],
            roomAction: 'ENTER',
            skipContentLengthHeader: true
          }),
          skipContentLengthHeader: true
        });
      };
      connectionConst.onDisconnect = function (frame) {
        console.log('짜로롱 방 나감');
      };
      connectionConst.activate();
      setSocketConnection(connectionConst);
    } else if (socketConnection) {
      console.log('소켓 연결이 존재함', socketConnection);
    }
  }, [userInfo, router.isReady]);

  useEffect(() => {
    console.log('이게?444');
    getUserInfo();
    roomInfoAPI(roomUrl['roomUrl']).then((res) => {
      if (res == true) {
        setRoomInfo(res.data);
        setBackgroundBE(res.data.background);
      }
    });
  }, [router.isReady]);

  useEffect(() => {
    console.log('이게?11333331');
    window.addEventListener('popstate', preventGoBack);
    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, [socketConnection]);

  const preventGoBack = () => {
    console.log('이게?111');
    socketConnection.publish({
      destination: '/app/room',
      body: JSON.stringify({
        sender: userInfo.data.memberName,
        roomId: roomUrl['roomUrl'],
        roomAction: 'EXIT',
        skipContentLengthHeader: true
      }),
      skipContentLengthHeader: true
    });
    socketConnection.deactivate();
  };

  useEffect(() => {
    console.log(datas);
    console.log('이게?');
  }, []);
  return (
    <>
      <SideBar socketConnection={socketConnection} />
      <Memo />
      <ChatWidgetView socketConnection={socketConnection} />
      <WhiteNoise />
      <TodoList />
      <Timer />
      <Dday />
      <Background />
    </>
  );
};

export default StudyRoom;
