module.exports = {
    id: "betteranime.net",
    run: (url, modules, callback) => {
        let sources = {}

        function Append(quality, source, check) {
            sources[quality] = source
            if(Object.keys(sources).length == check.length) { callback(sources) }
        }

        modules.request(0).get(url + "/download", (err, response, a) => {
            let d1 = modules.parser(a)        
            let srcs = d1.querySelectorAll(".mt-4 > a")
            srcs.forEach(item => {
                let quality = item.textContent.replace("Qualidade", "").replace(" ", "")
                let href = item.getAttribute("href")
                modules.request(0).get(href, (err, response, b) => {
                    let d2 = modules.parser(b)
                    let key = JSON.parse(d2.querySelector("#__NEXT_DATA__").textContent).buildId
                    modules.request(0).get(`https://download.betteranime.net/_next/data/${key}/${href.split("/")[3]}.json`, (err, response, c) => { Append(quality, JSON.parse(c).pageProps.anime.path, srcs) })
                })
            })
        })
    }
}
