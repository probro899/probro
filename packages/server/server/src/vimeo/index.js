import { Vimeo } from 'vimeo';

const clientId = '8fafa2f49c1b5916299946e3fbdda2848f11da4d';
const clientSecrete = '87zPKXrIndKqjrmDJoDZkJF+HoKVLwRimB+90NxGbmrg85kU9nHo/CEO3RC9usmHJd3R6VYuYp/9+JzNUzGQbR+ZAjA6FLon/Y3EHXoRIsPlfgGGvVR1rTG76tcDBy6z';
const accessToken = '40d4d4c09ac3d0404bde392971bb465a';

const client = new Vimeo(clientId, clientSecrete, accessToken);

export default client;
