var Base64 = require('js-base64').Base64;
module.exports = {

    isBase64:function(createData) {
        if (createData == null || createData.length == 0) {
            return false;
        } else {
            try {
                return Base64.atob(createData) != null;
            } catch (err) {
                return false;
            }
        }
    },

    tryToSendResponse:function(res, status, result) {
        if(res.sent != true) {
            res.status(status).send(result);
        }
    },
};