export const MODULE_NAME = 'html-parser-util';

function q(v) {
  return `"${v}"`;
}

export function json2html(json) {
  // Empty Elements - HTML 4.01
  const empty = ['area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param', 'embed'];

  let child = '';
  if (json.child) {
    child = json.child.map((c) => json2html(c)).join('');
  }

  let attr = '';
  if (json.attr) {
    attr = Object.keys(json.attr).map((key) => {
      let value = json.attr[key];
      if (Array.isArray(value)) value = value.join(' ');
      return `${key}=${q(value)}`;
    }).join(' ');
    if (attr !== '') attr = ` ${attr}`;
  }

  if (json.node === 'element') {
    const { tag } = json;
    if (empty.indexOf(tag) > -1) {
      // empty element
      return `<${json.tag}${attr}/>`;
    }

    // non empty element
    const open = `<${json.tag}${attr}>`;
    const close = `</${json.tag}>`;
    return open + child + close;
  }

  if (json.node === 'text') {
    return json.text;
  }

  if (json.node === 'comment') {
    return `<!--${json.text}-->`;
  }

  if (json.node === 'root') {
    return child;
  }

  return '';
}
