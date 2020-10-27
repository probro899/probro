lasr errorCode: 145

connectionIdProvider*
=> { error: 'LocalCallHistory not found', errorCode: 101 }
=> { error: 'Chat history not found', errorCode: 102 }
=> { error: 'Type or connectionId not found in chatHistory', errorCode: 103 }

checkCreateOrJoin*
=> { error: 'Board not found', errorCode: 104 }
=> { error: 'Database not found', errorCode: 105 }

checkRoomCreated*
=> { error: 'Janus not found in store', errorCode: 106 }
=> { error: 'Conference Call not created', errorCode: 107 }
=> { error: 'Conference call session is not connected', errorCode: 108 }

editRoom*
=> { error: JSON.stringify(err), error_code: 109 }
=>{ error: e, errorCode: 113 }

createRoom*
=> { error: JSON.stringify(err), error_code: 110 }

createOffer*
=> { error, errorCode: 111 }
=> { error: e, errorCode: 114 }

joinRoom*
=> { error: 'Room Join Error "${e}"', errorCode: 112 }

eventListner*
=> { error: e, errorCode: 115 }

createOffer*
=> { error: e, errorCode: 116 }

addRemoteFeed*
=> { error: e, errorCode: 117 }
=> { error, errorCode: 118 }

onRemoteFeedMessageHandler*
=> { error, errorCode: 119 }

onPublisherStream*
=> { error: e, errorCode: 120 }

callHandler*
=> { error: e, errorCode: 121 }

conference-provider/closeHandler*
=> { error: e, errorCode: 122 }

closeHandler*(main)
=> { error: e, errorCode: 123 }

unpublishedHandler*
=> { error: e, errorCode: 124 }

onOffer*
=> { error: e, errorCode: 125 }

offerInitializationHandler*
=> { error: e, errorCode: 126 }

offerOnCommunicationNotOpen*
=> { error: e, errorCode: 127 }

 offerOnCOmmunicationOpen*
 => { error: e, errorCode: 128 }

 onSfuCallStatusChangeHandler*
 => { error: e, errorCode: 129 }

 sfuPingPong*
 => { error: e, errorCode: 130 }

 initCall(video call)*
 => {error: e, errorCode: 131 }

  createOffer(videocall)*
  => { error: e, errorCode: 132 }

 callUpgrader(videocall)*
 => { error: e, errorCode: 133 }

 answerCall(videocall)*
 => { error: e, errorCode: 134 }

 incomingCallHandler(videocall)*
 => { error: e, errorCode: 135}

 videocall answerHandler and createOffer*
 => exceptionHandler({ error: 'videocall plugin not found during answering call', errorCode: 136 }, props);
 => exceptionHandler({ error: 'videocall plugin not found during creating offer', errorCode: 136 }, props);

 errorHandler(videoCall)*
 => exceptionHandler({ error: err, errorCode: 137 });

 eventListner(videovall)*
 => { error: e, errorCode: 138 }

 remoteHangupHandler*
 =>  { error: e, errorCode: 139 }

 closeHandler*(video)
 => { error: e, errorCode: 140 }

 attachPlugin(videoCall)*
 => { error: e, errorCode: 141 }

 attachPlugin(conferenceCall)*
 => { error, errorCode: 142 }

 callUpgrader(conferenceCall)*
 => { error: e, errorCode: 143 }

 errorHandler(conferenceCall)*
 => { error: err, errorCode: 144 }

 exceptionHanlder(conferenceCall)*
 => { error: e, errorCode: 145 }

 exceptionHandler('videoCall')*
 => { error: e, errorCode: 146 }

 onCloseHandler(videoCall)*
 => {error: e, errorCode: 147 }

 communicationScreenInit(componentDidMout)*
 => { error: e, errorCode: 148 }

 deviceTest*
 => { error: e, errorCode: 149 }