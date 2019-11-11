export const preSaveHook = (next) => {
  return next();
};

export const documentToObject = (doc) => {
  return doc.toObject();
};
