function displayStats(roomId) {
    console.log("Stats" + roomId);
}

function removeStats(roomId) {
    console.log("Remove Stats" + roomId);
}

module.exports = {
    displayStats: displayStats,
    removeStats: removeStats
}