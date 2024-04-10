import interpolateValue from "./interpolateValue";

function slugify(text: string) {
  return text.trim().replaceAll(' ', '-').replaceAll('/', '-').toLowerCase()
}

function interpolateUrl(url: string, context: Record<string, string>) {
  Object.keys(context).forEach(key => {
    const value = context[key];
    const slugifiedValue = slugify(value);

    url = interpolateValue(url, key, slugifiedValue);
  });

  return url;
}

export default interpolateUrl
