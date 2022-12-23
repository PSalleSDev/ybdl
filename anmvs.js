module.exports = (url, modules, callback) => {
    modules.request(0).get(url, (err, response, data) => {
        let document = this.modules.parser(data)
        callback(SON.parse(document.querySelector(".player-frame > div").getAttribute("wire:initial-data")).serverMemo.data.episodiosLink)
    })
}