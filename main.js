import { config } from 'dotenv';
config({ path: './.env' })

import GetReel from "./helper/getReel.js";
import GetUrl from "./helper/getUrl.js";
import UploadToInstagram from "./helper/uploadToInstagram.js";
import UpdateReelStatus from './helper/updateReelStatus.js';
import { schedule } from "node-cron";
import { readFileSync } from 'fs';
import axios from 'axios';

async function handleReelProcess() {
    try {
        const { video: { file_id }, id } = GetReel()

        const { url } = await GetUrl(file_id)
        const captions = JSON.parse(readFileSync('./captions.json', 'utf-8') || '[]') || [];
        const caption = captions[Math.floor(Math.random() * captions.length)];
        await UploadToInstagram(url, caption + '...')
        UpdateReelStatus(id)
        const message = 'new reel uploaded on _gearglitch'
        await axios.get(`http://xdroid.net/api/message?k=k-7c2c2c6b4e68&t=error+on+gearglitch&c=${message}&u=`)
    } catch (error) {
        console.log(error)
        const message = error.message || error.responce.message || 'something went wrong!'
        await axios.get(`http://xdroid.net/api/message?k=k-7c2c2c6b4e68&t=error+on+gearglitch&c=${message}&u=`)
        await handleReelProcess()
    }
}

function SchedulePost() {
    console.log('auto post started...')

    schedule('0 10,12,14,17,22 * * *', async () => {
        try {
            await handleReelProcess();
        } catch (error) {
            console.error("Error in scheduled task:", error);
        }
    });
}

SchedulePost()