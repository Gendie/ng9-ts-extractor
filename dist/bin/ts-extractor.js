#!/usr/bin/env node

const yargs = require("yargs");
const extractor = require("../index");
const extract = extractor.execute;

const options = yargs
    .usage("Usage: -n <name>")
    // .option("p", { alias: "path", describe: "Project path", type: "string", demandOption: false })
    .option("i", { alias: "include", describe: "Files to include", type: "string", demandOption: true })
    .option("f", { alias: "format", describe: "Files to include", type: "string", default: 'xlf', demandOption: false })
    .option("o", { alias: "out-file", describe: "When to but messages", type: "string", demandOption: true })
    .argv;

extract(options["path"], options["out-file"]);