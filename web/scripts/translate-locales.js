const { basename, join, dirname } = require("path");
const { constants } = require("fs");
const { access } = require("fs/promises");
const { readFile, writeFile } = require("fs/promises");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const translate = require("@vitalets/google-translate-api");
const makeDir = require("make-dir");

// constants

const LOCALES_DIR = "locales";

// equals utils

const isNonNullable = (value) => value !== undefined && value !== null;

// fp utils

const toNullable = (value) => (value === undefined ? null : value);

const getOrElse = (elseFn) => (value) =>
  isNonNullable(value) ? value : elseFn();

const getOrEmptyArr = getOrElse(() => []);

const getOrEmptyObj = getOrElse(() => ({}));

// fs utils

const existFile = (path) =>
  access(path, constants.F_OK)
    .then(() => true)
    .catch(() => false);

// parse args from cli

const getConfigFromCli = () => {
  const { argv } = yargs(hideBin(process.argv))
    .option("from", {
      alias: "f",
      describe: "from lang",
      type: "string",
    })
    .option("to", {
      alias: "t",
      describe: "to langs",
      type: "array",
    })
    .strict();

  return {
    fromLang: argv.from,
    toLangs: argv.to,
  };
};

// locales

const getLocaleDir = (lang) => join(process.cwd(), LOCALES_DIR, lang);

const getLocalePath = (lang, localeName) =>
  join(getLocaleDir(lang), `${localeName}.json`);

const getLocaleOrNull = async (lang, localeName) => {
  const path = getLocalePath(lang, localeName);

  const isExistFile = await existFile(path);
  if (!isExistFile) {
    return null;
  }

  const buff = await readFile(path);

  return JSON.parse(buff);
};

const getLocales = async (lang) => {
  const { globby } = await import("globby");

  const localeDir = getLocaleDir(lang);

  const localePaths = await globby(`*.json`, {
    cwd: localeDir,
  });

  const result = {};

  for (const localePath of localePaths) {
    const localeName = basename(localePath, ".json");

    result[localeName] = await getLocaleOrNull(lang, localeName);
  }

  return result;
};

const saveLocale = async (lang, localeName, locale) => {
  const path = getLocalePath(lang, localeName);

  await makeDir(dirname(path));
  await writeFile(path, JSON.stringify(locale, null, 2));
};

// translate

// supported interpolation https://www.i18next.com/translation-function/interpolation
const translateText = async ({ text, fromLang, toLang }) => {
  const markerInterpolation = `¯\\_(ツ)_/¯`;

  const splittedQuery = text.split(/{{(.*?)}}/);
  const splittedMarkerQuery = text
    .replaceAll(/{{(.*?)}}/g, `{{${markerInterpolation}}}`)
    .split(/{{(.*?)}}/);

  const replacedQuery = splittedMarkerQuery
    .reduce(
      (acc, query, idx) => [
        ...acc,
        query === markerInterpolation ? `{{${idx}}}` : query,
      ],
      []
    )
    .join("");
  const interpolations = splittedMarkerQuery.reduce(
    (acc, query, idx) =>
      query === markerInterpolation
        ? { ...acc, [`{{${idx}}}`]: `{{${splittedQuery[idx]}}}` }
        : acc,
    {}
  );

  const { text: translatedText } = await translate(replacedQuery, {
    from: fromLang,
    to: toLang,
  });

  return Object.entries(interpolations).reduce(
    (acc, [key, value]) => acc.replace(key, value),
    translatedText
  );
};

const getOrTranslate = ({
  from: { lang: fromLang, locale: source },
  to: { lang: toLang, locale: target },
}) =>
  isNonNullable(target)
    ? target
    : translateText({ text: source, fromLang, toLang });

const translateLocale = async ({
  from: { lang: fromLang, locale: source },
  to: { lang: toLang, locale: target },
}) => {
  switch (true) {
    // locale value is boolean
    case typeof source === "boolean":
      throw new Error("can't translate boolean value");

    // locale value is number
    case typeof source === "number":
      throw new Error("can't translate number value");

    // locale value is nullable
    case !isNonNullable(source):
      throw new Error("can't translate nullable value");

    // locale value is string
    case typeof source === "string":
      return getOrTranslate({
        from: { lang: fromLang, locale: source },
        to: { lang: toLang, locale: target },
      });

    // locale value is array
    case typeof source === "object" && Array.isArray(source): {
      const result = [];

      for (const key in source) {
        const targetValue = getOrEmptyArr(target)[key];

        const translatedValue = await translateLocale({
          from: { lang: fromLang, locale: source[key] },
          to: {
            lang: toLang,
            locale: toNullable(targetValue),
          },
        });

        result.push(translatedValue);
      }

      return result;
    }

    // locale value is object, not array
    case typeof source === "object" && !Array.isArray(source): {
      const result = {};

      for (const key in source) {
        const targetValue = getOrEmptyObj(target)[key];

        const translatedValue = await translateLocale({
          from: { lang: fromLang, locale: source[key] },
          to: {
            lang: toLang,
            locale: toNullable(targetValue),
          },
        });

        result[key] = translatedValue;
      }

      return result;
    }

    default:
      throw new Error("don't match locale value");
  }
};

// main

const run = async (config) => {
  const locales = await getLocales(config.fromLang);

  for (const toLang of config.toLangs) {
    for (const [localeName, locale] of Object.entries(locales)) {
      const existLocale = getOrEmptyObj(
        await getLocaleOrNull(toLang, localeName)
      );

      const translatedLocale = await translateLocale({
        from: {
          lang: config.fromLang,
          locale: locale,
        },
        to: {
          lang: toLang,
          locale: existLocale,
        },
      });

      await saveLocale(toLang, localeName, translatedLocale);
    }
  }
};

const main = async () => {
  const config = getConfigFromCli();

  await run(config);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
