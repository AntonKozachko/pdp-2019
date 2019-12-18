export function getCorsOptions (origin, cb) {
  const whitelist = [`http://${proccess.env.WEB_APP_HOST}:${proccess.env.WEB_APP_PORT}`];

  if (whitelist.indexOf(origin) !== -1 || !origin) {
    cb(null, true)
  } else {
    cb(new Error('Not allowed by CORS'))
  }
}
