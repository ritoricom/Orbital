const { resolve } = require("path");

const isNonNullable = (value) => value !== undefined && value !== null;

module.exports = {
  prompt: async ({ prompter, args }) => {
    const getName = async () => {
      const nameArg = args.name || args.n;
      if (isNonNullable(nameArg) && nameArg !== "") {
        return nameArg;
      }

      const { name } = await prompter.prompt({
        type: "input",
        name: "name",
        message: "What is the component name?",
      });

      return name;
    };
    const getDir = async () => {
      const dirArg = args.dir || args.d;
      if (isNonNullable(dirArg) && dirArg !== "") {
        return dirArg;
      }

      const { dir } = await prompter.prompt({
        type: "input",
        name: "dir",
        message: "Where is the directory?",
      });

      return dir;
    };

    const name = await getName();
    const dir = await getDir();

    const path = resolve("src", dir, name);

    return { name, path };
  },
};
