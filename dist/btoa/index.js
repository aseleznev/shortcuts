const bbtoa = require('btoa');
module.exports = {
    getShortLink: longLinc => {
        return bbtoa(longLinc);
    }
};
console.log(Buffer.from("Hello World").toString('base64'));
//# sourceMappingURL=index.js.map