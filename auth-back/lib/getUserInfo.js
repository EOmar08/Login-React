exports.getUserInfo = function (user) {
    return {
        username: user.username,
        name: user.name,
        id: user.id
    }
}

// function getUserInfo(user) {
//     return {
//         username: user.username,
//         name: user.name,
//         id: user.id
//     }
// }

// module.exports = getUserInfo