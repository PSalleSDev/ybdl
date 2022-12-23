module.exports = {
    id: "Anime Vision",
    run: (url, modules, callback) => {
        modules.request(0).get(url, (err, response, data) => {
            let document = modules.parser(data)
            callback(JSON.parse(document.querySelector(".player-frame > div").getAttribute("wire:initial-data")).serverMemo.data.episodiosLink)
        })
    }
}
