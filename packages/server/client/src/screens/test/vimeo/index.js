import React from 'react';
import Vimeo from 'react-vimeo';
// import tus from 'tus-js-client';
import axios from 'axios';
import uploadVideo from './helper-functions/uploadVideo';
import replaceVideo from './helper-functions/replaceVideo';
import createVideo from './helper-functions/createVideo';
import addAndUpdateVideoDescription from './helper-functions/addOrUpdateDescription';
import getVideoElement from '../vimeo/helper-functions/getVideoElement';

const accessToken = '40d4d4c09ac3d0404bde392971bb465a';
const upload_link = 'https://asia-files.tus.vimeo.com/files/vimeo-prod-src-tus-asia/494fdd9f443973f9d30f446728abfbf0';
const newVideoUploadLink = 'https://asia-files.tus.vimeo.com/files/vimeo-prod-src-tus-asia/360e8a9299d59d2e35b30d65c5227e3d';
const newUri = '/videos/538041281';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = async (e) => {
    try {
      const File = e.target.files[0];
      // const { upload } = await replaceVideo(File);
      const createRes = await createVideo(File);
      console.log('Create res', createRes);
      // uploadVideo(File, newVideoUploadLink);
    } catch (err) {
      console.error('Error in file upload', err);
    }
  }

  changeInput = (e, type) => {
    this.setState({ [type]: e.target.value });
  }

  getVideoElemnt = async () => {
    const res = await getVideoElement(538041281);
    return res;
  }

  render() {
    console.log('State value', this.state);
    const { webRtc, account } = this.props;
    const { apis } = webRtc;
    const { name, description } = this.state;
    return (
      <div>
        <div>
          <h4>upload and replace video</h4>
          <input type="file" onChange={this.onChange} />
          <h4>Add Or change description of video</h4>
          <input placeholder="name" type="text" onChange={(e) => this.changeInput(e, 'name')} />
          <input placeholder="description" type="text" onChange={(e) => this.changeInput(e, 'description')} />
          <button onClick={() => addAndUpdateVideoDescription({name, description}, apis)}>Add Description</button>
          <h4>Video embeding</h4>
          <div style={{ height: 400, width: 400 }}>
            <button onClick={this.getVideoElemnt}>getVideo Element</button>
            {/* <Vimeo videoId={538041281} /> */}
            <iframe
            src="https://player.vimeo.com/video/543964847" 
            width="480" 
            height="360" 
            frameborder="0" 
            title="My video" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
// /video/543964847