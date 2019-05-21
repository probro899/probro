import { createParser, PKT_CALL, PKT_RPC_REQUEST, PKT_SCOPE_REQUEST } from '@probro/common/proSocket-common';

const slicedToArray = (arr, i) => {
  // console.log('slicedToArray called', arr, i);
  return arr;
};

const noop = () => { };

const connect = (url, store) => {
  // console.log('connect socket is called', url, store);

  // eslint-disable-next-line
  const Socket = WebSocket;
  const newtwork = null;

  const parser = createParser();

  let serial = 0;
  let scopeSerial = 0;
  let rpcs = {};
  let scopeCalls = {};
  let scopeManifests = {};
  const listeners = {};
  const pending = [];

  const fire = (event, data) => {
    const eventListeners = listeners[event];
    if (eventListeners) {
      // Call the listeners with client as `this` instance
      // eslint-disable-next-line no-use-before-define
      eventListeners.forEach((element) => {
        return element.call(client, data);
      });
    }
  };

  const deferSend = (pkt) => {
    pending.push(pkt);
    return () => {
      let idx = pending.indexOf(pkt);
      if (idx >= 0) {
        pending.splice(idx, 1);
      }
    };
  };

  const connection = (remoteUrl) => {
    if (remoteUrl === null) {
      return null;
    }

    const sock = new Socket(remoteUrl);
    sock.onopen = () => {
      // Execute all the pending calls
      pending.forEach((p) => {
        return sock.send(p);
      });

      // empty pending pkt
      pending.length = 0;
      fire('connect');
    };

    // Listening all the incomming message
    sock.onmessage = (e) => {
      // console.log('data in socket from sever', e.data);
      parser.parse(e.data);
    };

    // to do on socket closed

    sock.onclose = () => {
      // Clear all pending as they will be rejected from below
      pending.length = 0;

      // Reject all rpcs and scopes with termination error
      // console.log('rpcs', Object.values(rpcs));
      // console.log('scopeCalls', Object.values(scopeCalls));
      const rejections = Object.values(rpcs).concat(Object.values(scopeCalls));
      rpcs = {};
      scopeCalls = {};
      console.log('rejections', rejections);
      // rejections.forEach((ref) => {
      //   const ref2 = slicedToArray(ref, 2);
      //   const reject = ref2[1];
      //   reject(new Error('Connection terminated'));
      // });

      // Clear all the scope manifests
      scopeManifests = {};
      fire('disconnect');
    };

    sock.onerror = (e) => {
      const rejections = Object.values(rpcs).concat(Object.values(scopeCalls));
      rpcs = {};
      scopeCalls = {};

      // Clear all pending tasks as they will be rejected from below
      pending.length = 0;

      // Reject all rpcs and scopes with error
      rejections.forEach((res) => {
        const ref = slicedToArray(res, 2);
        const reject = ref[1];
        reject(e.message);
      });

      // Fire the error event on client
      fire('error', e.message);
    };

    return sock;
  };

  // assign onEvent of socket to this fire func
  parser.onEvent = fire;

  // Handle action dispatch by server
  parser.onAction = (action) => {
    // console.log('action called', action);
    store.dispatch(action);
  };

  // Handle Remote procedure call response
  parser.onRpcResponse = (tracker, success, result) => {
    // console.log('onRpc resposnse', tracker, success, result);
    const rpcTracker = slicedToArray(rpcs[tracker], 2);
    const resolve = rpcTracker[0];
    const reject = rpcTracker[1];
    delete rpcs[tracker];

    if (success) {
      resolve(result);
    } else {
      reject(result);
    }
  };

  // Handle scope response
  parser.onScopeResponse = (tracker, success, result) => {
    // console.log('scope response called', tracker, success, result);
    const scopeCallTracker = slicedToArray(scopeCalls[tracker], 4);
    const resolve = scopeCallTracker[0];
    const reject = scopeCallTracker[1];
    const scopeId = scopeCallTracker[2];
    const manifest = scopeCallTracker[3];

    delete scopeCalls[tracker];
    if (!success) {
      reject(result);
    } else {
      const apis = result || manifest.api;

      const scopedApi = apis.reduce((res, api) => {

        res[api] = (...Arguments) => {
          const argLenth = [Arguments].length;
          const args = Array(argLenth);
          for (let key = 0; key < argLenth; key += 1) {
            args[key] = Arguments[key];
          }
          return client.rpc.apply(client, [scopeId, api, ...args]);
        };
        return res;
      }, {});

      // Store the scond api for easy retrieval later
      scopeManifests[scopeId] = scopedApi;
      resolve(scopedApi);
    }
  };

  // Initialize with a connection attemp
  let socket = connection(url);

  let client = {
    // check socket is connected or not
    isConnected: () => {
      return socket && socket.readyState === Socket.OPEN;
    },

    // reconnect the socket if connect failer
    reconnect: (...Arguments) => {
      // console.log('reconnect', Arguments);
      const remoteUrl = Arguments.length > 0 && Arguments[0] !== undefined ? Arguments[0] : null;

      // Cannnot connect without a remote url
      if (remoteUrl === null && socket === null) {
        return false;
      }

      // Use the given url or a last successfully connected url
      let finalUrl = remoteUrl || socket.url;

      // Only perform a reconnect if the socket is not connected or the url has changed

      if (socket === null || socket.url !== finalUrl || socket.readyState !== Socket.OPEN) {
        // Make sure to clearnUp the previous socket

        if (socket !== null) {
          socket.close();
        }

        // Perform a new connection
        socket = connection(finalUrl);
        // The reconnection has been attempted
        return true;
      }

      // No reattempt needed

      return false;
    },
    // close socket function
    close: () => {
      socket.close();
      socket = null;
    },

    on: (event, listener) => {
      // Keep track of event listeners
      const eventListeners = listeners[event];

      if (!eventListeners) {
        listeners[event] = [listener];
      } else {
        eventListeners.push(listener);
      }

      return () => {
        listeners[event] = listeners[event].filter(l => l === listener);
      };
    },

    call: (scope, api, ...Arguments) => {
      const argLenth = Arguments.length;
      const args = Array(argLenth > 2 ? argLenth - 2 : 0);
      for (let key = 2; key < argLenth; key += 1) {
        args[key - 2] = Arguments[key];
      }

      // making packet to send
      const pkt = PKT_CALL(scope, api, args);
      // check socket is connected or not if not then store the packet for latter send
      if (!client.isConnected()) {
        return deferSend(pkt);
      }
      // Send the request, its not an rpc so need to keep track
      socket.send(pkt);
      return noop;
    },

    rpc: (scope, api, ...Arguments) => {
      console.log('rpc called', scope, api, Arguments);
      const argLenth = Arguments.length;
      const args = Array(argLenth > 2 ? argLenth - 2 : 0);
      for (let key = 2; key < argLenth; key += 1) {
        args[key - 2] = Arguments[key];
      }

      return new Promise((resolve, reject) => {
        serial += 1;
        rpcs[serial] = [resolve, reject];

        const pkt = PKT_RPC_REQUEST(serial, scope, api, Arguments);
        console.log('packet', pkt);

        if (!client.isConnected()) {
          return deferSend(pkt);
        }
        socket.send(pkt);
        return noop();
      });
    },

    scope: (name, ...Arguments) => {
      // console.log('scope', name, Arguments);
      const manifest = Arguments.length > 1 && Arguments[1] !== undefined ? Arguments[1] : null;

      return new Promise((resolve, reject) => {
        // If the scope has already been manifested return immediately

        if (scopeManifests[name]) {
          return resolve(scopeManifests[name]);
        }

        scopeSerial += 1;
        scopeCalls[scopeSerial] = [resolve, reject, name, manifest];

        const pkt = PKT_SCOPE_REQUEST(scopeSerial, name, !manifest);

        if (!client.isConnected()) {
          return deferSend(pkt);
        }

        socket.send(pkt);
        return noop;
      });
    },
  };

  // Setup a network change listener to keep the connection alive

  if (newtwork) {
    newtwork.on('online', () => {
      // Establish a connection as soon as we are online

      if (socket !== null) {
        client.reconnect();
      }
    });

    newtwork.on('offline', () => {
      // close the socket as soon as we go offline

      if (socket !== null) {
        socket.close();
      }
    });
  }

  return client;
};

export default connect;
