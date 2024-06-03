const axios = require("axios").default
const fs = require("fs-extra")
const path = require("path")

async function download () {
    const { platform, env } = process
    const repoUrl = "https://api.github.com/repos/the-gntl-project/gntl/releases/latest"
    try {
        const pwd = process.cwd()
        const downloadDir = path.join(pwd, "downloads")
        await fs.ensureDir(downloadDir)

        const headers = { "Content-Type": "application/json", "User-Agent": "GNTL-Electron-Wallet" }

        if (env.GH_TOKEN) { headers.Authorisation = `Bearer ${env.GH_TOKEN}`; }

        const { data } = await axios.get(repoUrl, { headers })
        const url = (data.assets || [])
            .map(asset => asset["browser_download_url"])
            .find(url => {
                if (platform === "linux") {
                    return url.includes("Linux-x86_64")
                } else if (platform === "win32") {
                    return url.includes("Windows-x86_64")
                }
                return url.includes("macOS-x86_64")
            })

        if (!url) { throw new Error("Download URL not found for " + process) }

        console.log("Downloading Binary at URL: " + url)

        const extension = path.extname(url)
        const filePath = path.join(downloadDir, "latest" + extension)
        const { data: artifact } = await axios.get(url, { responseType: "stream" })
        artifact.pipe(fs.createWriteStream(filePath))
        console.log("Downloaded Binary to: " + filePath)
    } catch (err) {
        console.error("Failed to download Binary: " + err)
        process.exit(1)
    }
}

download()
