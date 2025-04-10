import { readFileSync } from "fs";

function GetReel() {
    const reels = JSON.parse(readFileSync('./reels_data.json', 'utf-8') || '[]') || []

    const new_reel = reels.filter(reel => !reel.uploaded).reverse()[0] || false

    if (!new_reel) {
        console.log('no reels remaing!')
        return false
    }
    const {
        id,
        video: { file_id, duration, file_size },
        hashtags, musicInfo, caption, shortCode, chat
    } = new_reel

    return {
        id,
        video: { file_id, duration, file_size, chat },
        hashtags, musicInfo, caption, shortCode
    }
}

// GetReel()

export default GetReel