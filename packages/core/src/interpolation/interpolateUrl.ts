import interpolateValue from "./interpolateValue";

function slugify(text: string) {
  return text.trim().replaceAll(' ', '-').replaceAll('/', '-').toLowerCase()
}

function interpolateUrl(url: string, values: Record<string, string>) {
  Object.keys(values).forEach(key => {
    const value = values[key];
    const slugifiedValue = slugify(value);

    url = interpolateValue(url, key, slugifiedValue);
  });

  return url;
}

export default interpolateUrl
