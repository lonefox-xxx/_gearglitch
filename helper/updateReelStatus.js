import { readFileSync, writeFileSync } from "fs"

function UpdateReelStatus(id) {
    try {
        const reels = JSON.parse(readFileSync('./reels_data.json', 'utf-8') || '[]')

        const index = reels.findIndex(reel => reel.id == id)
        if (index === -1) {
            console.log(`Reel with id ${id} not found.`)
            return
        }

        reels[index].uploaded = true

        writeFileSync('./reels_data.json', JSON.stringify(reels, null, 2)) // pretty print

    } catch (error) {
        console.log('Error updating reel status:', error)
    }
}

export default UpdateReelStatus
