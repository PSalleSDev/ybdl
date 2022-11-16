module.exports = (url, modules, callback) => {
    modules.request(false).get(url + "/download", (err, response, a) => {
        let d1 = modules.parser(a)
        let split = String(url).split("/")
        let sources = {}

        d1.querySelectorAll(".mt-4 > a").forEach(item => {
            let quality = item.textContent.replace("Qualidade", "").replace(" ", "")
            let href = item.getAttribute("href")
            sources[quality] = () => {
                modules.request(false).get(href, (err, response, b) => {
                    let d2 = modules.parser(b)
                    let key = JSON.parse(d2.querySelector("#__NEXT_DATA__").textContent).buildId
                    modules.request(false).get(`https://download.betteranime.net/_next/data/${key}/${href.split("/")[3]}.json`, (err, response, c) => {
                        modules.save(JSON.parse(c).pageProps.anime.path, `./(${quality}) ${split[5]}-${split[6]}.mp4`)
                    })
                })
            }
        })

        callback(sources)
    })
}
