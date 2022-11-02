// @ts-nocheck
import * as SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { callback } from './SocketUtils';

function makeSocketConnection(url) {
  const socketClient = new Client({
    connectHeaders: {
      login: 'user',
      passcode: '3bb62c24-b646-4364-8f85-d91379d64c56'
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    // brokerURL: 'wss://zzip0.com/ws',
    webSocketFactory: function () {
      return new SockJS('https://zzip0.com/api/ws');
    },
    onConnect: function (frame) {
      console.log('여기는 클라이언트 안입니다.');
      console.log(url);
      socketClient.subscribe(`/topic/room/${url}`, callback);
      socketClient.publish({
        destination: '/app/room',
        body: JSON.stringify({
          sender: '전선영',
          roomId: url,
          roomAction: 'ENTER',
          skipContentLengthHeader: true
        }),
        skipContentLengthHeader: true
      });
    },
    onStompError: function (frame) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    }
  });
  return socketClient;
}

export default makeSocketConnection;
