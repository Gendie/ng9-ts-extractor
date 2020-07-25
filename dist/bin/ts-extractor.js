#!/usr/bin/env node

const yargs = require("yargs");
const extractor = require("../index");
const extract = extractor.execute;

const options = yargs
    .usage("Usage: -n <name>")
    .option("i", { alias: "include", describe: "Files to include", type: "string", demandOption: true })
    .option("f", { alias: "format", describe: "Output format. (For now only xlf is supported).", type: "string", default: 'xlf', demandOption: false })
    .option("o", { alias: "out-file", describe: "Path where you would like to save extracted strings", type: "string", demandOption: true })
    .argv;

extract(process.cwd(), options["include"], options["out-file"], options["format"] || 'xlf');