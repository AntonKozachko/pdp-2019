const IMAGE_URL_REGEXP = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

export const imageUrlValidator = (url) => (url ? IMAGE_URL_REGEXP.test(url) : undefined);
