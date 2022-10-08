import parseArgs from 'minimist';

const options = {
    alias: {
        p: 'puerto',
        m: 'modo'
    },
    default: {
        puerto: 8080,
        modo: 'fork'
    }
}

const commandLineArgs = process.argv.slice(2);
const { puerto, modo, _ } = parseArgs(commandLineArgs, options);

export { puerto, modo };