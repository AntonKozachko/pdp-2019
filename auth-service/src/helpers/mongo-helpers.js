export const preSaveHook = (next) => {
  console.warn(this);

  return next();
}

export const documentToObject = (doc) => {
  return doc.toObject();
}