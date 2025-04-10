import CreateCompleteVideo from "./helper/createComepleteVideo.js";
import DownloadVideo from "./helper/downloadVideo.js";
import UploadToInstagram from "./helper/uploadToInstagram.js";
import UploadToTelegram from "./helper/uploadToTelegram.js";

import { config } from 'dotenv';
config({ path: './.env' })

// CreateCompleteVideo().then(console.log)

// DownloadVideo('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4').then(console.log)

UploadToTelegram().then(console.log)