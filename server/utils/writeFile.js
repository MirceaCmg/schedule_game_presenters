const fs = require('fs')

const writeFile = (file, data, errorMessage, res) => {
    fs.writeFile(file, JSON.stringify(data), (err) => {
        if (err) {
            console.log(errorMessage)

            res.status(400)
            res.send(`${errorMessage}${err}`)
        } else {
            res.status(200)
            res.send(JSON.stringify(data))
        }
    })
}

module.exports = writeFile
