import { exists } from 'https://deno.land/std@0.216.0/fs/mod.ts';
import { format } from 'https://deno.land/std@0.216.0/datetime/format.ts';
import parseXml from './xml/parseXml.ts';
import writeFileStructure from './files/writeFileStructure.ts';
import readFileStructure from './files/readFileStructure.ts';
import buildXml from './xml/buildXml.ts';

function getTimeString() {
    return format(new Date(), 'yyyy-MM-dd-HH-mm-ss');
}

function printHelp() {
    console.log(
        `\nDecodes and encodes keycap_config.xml file, found in a bunch of Sega games.\n\nDecode keycap_config.xml:\nkeycapConfig <xml_file> [output_directory]\n\nEncode directory structure to keycap_config.xml:\nkeycapConfig <directory> [output_file]\n`
    );
}

if (
    Deno.args.length === 0 ||
    Deno.args.includes('--help') ||
    Deno.args.includes('help')
) {
    printHelp();
    Deno.exit();
}

if (
    await exists(Deno.args[0], {
        isReadable: true,
        isFile: true,
    })
) {
    console.log('Reading XML file...');
    const xmlData = await Deno.readTextFile(Deno.args[0]);
    console.log('Parsing XML file...');
    const parsedXml = parseXml(xmlData);
    console.log('Writing files...');
    await writeFileStructure(
        Deno.args[1] ?? `./output-${getTimeString()}`,
        parsedXml
    );
    console.log('Done!');
} else if (
    await exists(Deno.args[0], {
        isReadable: true,
        isDirectory: true,
    })
) {
    console.log('Reading directory structure...');
    const groups = await readFileStructure(Deno.args[0]);
    console.log('Building XML file...');
    const xmlFile = buildXml(groups);
    console.log('Writing XML file...');
    await Deno.writeTextFile(
        Deno.args[1] ?? `./keycap_config-${getTimeString()}.xml`,
        xmlFile
    );
    console.log('Done!');
} else {
    console.error('No existing file or directory provided!');
}
