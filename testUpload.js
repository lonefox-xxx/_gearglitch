import { config } from 'dotenv';
config({ path: './.env' })

import GetReel from "./helper/getReel.js";
import GetUrl from "./helper/getUrl.js";
import UploadToInstagram from "./helper/uploadToInstagram.js";
import UpdateReelStatus from './helper/updateReelStatus.js';
import { readFileSync } from 'fs';
import axios from 'axios';
import CreateCompleteVideo from './helper/createComepleteVideo.js';
import UploadToTelegram from './helper/uploadToTelegram.js';
import DownloadVideo from './helper/downloadVideo.js';

async function handleReelProcess() {
    try {
        const { video: { file_id }, id } = GetReel()

        const { url } = await GetUrl(file_id)

        const captions = JSON.parse(readFileSync('./captions.json', 'utf-8') || '[]') || [];
        const caption = captions[Math.floor(Math.random() * captions.length)];

        await DownloadVideo(url)

        await CreateCompleteVideo()

        const { url: uploadUrl, fileId } = await UploadToTelegram()

        await UploadToInstagram(uploadUrl, caption + '...')

        UpdateReelStatus(id, fileId)
        const message = 'new reel uploaded on _gearglitch'
        await axios.get(`http://xdroid.net/api/message?k=k-7c2c2c6b4e68&t=error+on+gearglitch&c=${message}&u=`)
    } catch (error) {

        const message = error.message || error.responce.message || 'something went wrong!'
        await axios.get(`http://xdroid.net/api/message?k=k-7c2c2c6b4e68&t=error+on+gearglitch&c=${message}&u=`)
        await handleReelProcess()
    }
}

