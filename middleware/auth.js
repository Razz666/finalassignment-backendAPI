const jwt = require('jsonwebtoken');
const user = require('../model/model_user')

module.exports.verifyUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verifiedData = jwt.verify(token, 'Sercretkey');

        user.findOne({ _id: verifiedData.userId })
            .then(function (userInfo) {
                // res.send(userInfo);
                req.userData = userInfo
                next();
            })
            .catch(function (e) {
                res.status(201).json({ message: e });
            })
        // console.log(verifiedData.userId);
    }
    catch(error) {
        res.status(500).json({ message: error })
    }
}

// module.exports.verifyAdmin = function (req, res, next) {
//     if (!req.userData) {
//         return res.status(401).json({ message: "Unauthorized user" });
//     }
//     else if (req.userData.userType !== 'Admin') {
//         return res.status(401).json({ message: "Unauthorized user" });
//     }
//     next();
// }