const fs = require('fs')

const readFile = (file, res) => new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
        if (err) {
            const errorMessage = `Error, failed to open ${file}: ${err}`
            console.log(errorMessage)

            res.status(400)
            res.send(errorMessage)

            reject(err)
        }

        resolve(data)
    })
})

module.exports = readFile
