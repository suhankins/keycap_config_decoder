import { XMLBuilder } from 'npm:fast-xml-parser';
import type { Groups } from '../files/readFileStructure.ts';

export default function buildXml(groups: Groups) {
    const builder = new XMLBuilder({
        attributeNamePrefix: '$',
        ignoreAttributes: false,
        format: true,
        textNodeName: 'data',
        suppressEmptyNode: true,
        indentBy: '    ',
    });

    return `<?xml version="1.0" ?>\n${builder.build(groups)}`;
}
