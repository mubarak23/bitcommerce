import logger from '../logger'


function tryToParseJSON(item) {
  try {
    return JSON.parse(item);
  } catch (e) {
    return item;
  }
}

const middlewareHandler = (req, res, next) => {
  res.on('finish', () => {
    const requestBody = tryToParseJSON(req.body)
    const responseBody = tryToParseJSON(res.body)

    logger.info({
      endPoint: req.originalUrl,
      request: {
        headers: req.headers,
        body: requestBody,
      },
      response: {
        statusCode: res.statusCode,
        body: responseBody,
      },
    })
  })

  next()
}

export default middlewareHandler
