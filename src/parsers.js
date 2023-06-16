import yaml from 'js-yaml';

const parsers = {
  json(content) {
    return JSON.parse(content);
  },
  yaml(content) {
    return yaml.load(content);
  },
  yml(content) {
    return yaml.load(content);
  },
};

export default parsers;
