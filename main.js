import { config } from 'dotenv';
config({ path: './.env' })

import GetReel from "./helper/getReel.js";
import GetUrl from "./helper/getUrl.js";
import UploadToInstagram from "./helper/uploadToInstagram.js";
import UpdateReelStatus from './helper/updateReelStatus.js';
import { schedule } from "node-cron";
import { readFileSync } from 'fs';

async function handleReelProcess() {
    try {
        const { video: { file_id }, id } = GetReel()

        const { url } = await GetUrl(file_id)
        const captions = JSON.parse(readFileSync('./captions.json', 'utf-8') || '[]') || [];
        const caption = captions[Math.floor(Math.random() * captions.length)];
        await UploadToInstagram(url, caption + '...')
        UpdateReelStatus(id)
    } catch (error) {
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