import WebSocket from 'ws';
import UrlPattern from 'url-pattern';
import Session from './Session';
import Channel from './Channel';
import createDefaultProvider from './defaultChannelProvider';

function noop() { }

function beat() {
  this.isAlive = true;
}

export default function start(options, validateSession, pulseRate = 30000) {

  const { url, channelProvider, ...other } = options;
  console.log('socked npm called', url);

  // Use the channel provider
  Channel.setProvider(channelProvider || createDefaultProvider());
  // console.log('chanelProvider', channelProvider);
  const urlPattern = url ? new UrlPattern(options.url) : null;
  // console.log('urlPattern', urlPattern);
  const wsOptions = {
    ...other,
    verifyClient: (info, cb) => {
      // match the url pattern if available
      const params = urlPattern ? urlPattern.match(info.req.url) : {};
      // console.log('verifyclient param', params);
      if (params === null) {
        cb(false, 404, `Can't serve ${info.req.url}`);
        return;
      }
      // eslint-disable-next-line no-param-reassign
      info.req.params = params;
      cb(true);
    },
  };

  // console.log('wsOption', wsOptions);

  const wss = new WebSocket.Server(wsOptions);
  // console.log('wss', wss);
  wss.on('connection', (ws, req) => {
    // console.log('try to connect', req.params);
    // Create a new session object, in transmit mode, until validated
    const session = new Session(req, req.params, ws);
    // console.log('session', session);

    Promise.resolve(validateSession(session)).catch((err) => {
      // console.log('session', session);
      session.emit('error', err.message);
      ws.close();
    }).then((res) => {
      // console.log('res', res);
      if (res || res === undefined) {
        // Enable reception mode
        session.activate(ws);
        // Add heart beat
        if (pulseRate) {
          ws.isAlive = true;    // eslint-disable-line no-param-reassign
          ws.on('pong', beat);
        }

        // TODO: How to handle error condition
        ws.on('error', (err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
      } else {
        ws.close();
      }
    });
  });

  function keepAlive() {
    wss.clients.forEach((ws) => {
      if (!ws.isAlive) {
        console.log('conneciton failed');
        return ws.terminate();
      }

      // eslint-disable-next-line no-param-reassign
      ws.isAlive = false;
      return ws.ping(noop);
    });
  }

  const heartBeat = pulseRate > 0 ? setInterval(keepAlive, pulseRate) : null;

  // Return an instance of server
  return {
    stop: () => {
      if (heartBeat) {
        clearInterval(heartBeat);
      }

      // Close all client connections
      wss.clients.forEach(ws => ws.close());

      // Close the server
      wss.close();
    },

    length: () => wss.clients.size(),
  };
}
