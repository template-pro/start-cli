import fs from "fs";
import { fileURLToPath } from 'url';
import path from "path";
import chalk from "chalk";
import mri from "mri";
import { Argv } from "./type";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolvePath = (...arg: any[]) => path.resolve(__dirname, '..', ...arg);
const readFileSync = (path: string) => fs.readFileSync(resolvePath(path), 'utf8');
const pkg = JSON.parse(readFileSync('./package.json'));
// const moduleName = pkg.name.replace(/^@.*\//, '')

const argv = mri<Argv>(process.argv.slice(2), {
  alias: { h: 'help', v: 'version' },
  string: ['branch', 'glob'],
});

async function main(args: Argv = argv) {
  if (args.version) {
    console.log(`${chalk.bold(pkg.name)}: ${chalk.green('v' + pkg.version)}`);
    return;
  }

  if (args.help) {
    console.log(`
    npx ${pkg.name}
    ----------------------------------------
    -h, --help: show help.
    -v, --version: show version. ${chalk.green('v' + pkg.version)}
    ----------------------------------------
    ${chalk.bold('e.g.')} ${chalk.green(`${pkg.name} -h`)}
  `)
    return;
  }

  console.log(`Welcome ${chalk.green(pkg.name)}`);
}

export default main;
