const baseController = {}

baseController.home = (req, res) => {
    res.send('Amy Rodriguez')
}

baseController.self = (req, res) => {
    res.send('Andre Regino')
}

module.exports = baseController