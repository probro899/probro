/* eslint-disable import/no-cycle */
import janusInit from '../../../../webrtc/sfu';
import store from '../../../../store';
import conferencePluginAttachment from './conference-call-provider/attachPlugin';
import exceptionHandler from './conference-call-provider/exceptionHandler';
import { attachPlugin as oneToOnePluginAttachment } from './video-call-provider';
import { attachPlugin as streamPluginAttachment } from './streaming';

export default async (props) => {
  try {
    const { updateWebRtc } = props;
    const { webRtc } = store.getState(props);
    const janusInitRes = await janusInit(props);
    const { janus, error } = janusInitRes;
    await updateWebRtc('janus', { ...webRtc.janus, janus });
    if (janus) {
      await oneToOnePluginAttachment(props);
      await conferencePluginAttachment(props);
      await streamPluginAttachment(props);
    }
    if (error) {
      throw janusInitRes;
    }
  } catch (e) {
    exceptionHandler(e, props);
  }
};
