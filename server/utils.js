const base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const base62Len = base62.length;

module.exports = {
  getShortURL: (origin) => {
    console.debug(`Get Short URL from ${origin}`)
    // base 62
    if(typeof origin != 'number') {
      return "ERROR"
    }

    var encoded = ''
    while(origin > 0) {
      encoded = base62.charAt(origin % base62Len) + encoded
      origin = parseInt(origin / base62Len)
    }
    
    return encoded
  },

  getIdFrom: (shortUrl) => {
    console.debug(`Get the ID for short URL ${shortUrl}`)
    var len = shortUrl.length
    var id = 0
    for(var i = 0; i < len; i++) {
      id = id + base62.indexOf(shortUrl[i]) * Math.pow(base62Len, (len - i - 1))
    }
    return id
  }
}