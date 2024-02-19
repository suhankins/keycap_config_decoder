import { XMLParser } from 'npm:fast-xml-parser';
import decode from '../base64/decode.ts';

export type FileStructure = ReturnType<typeof parseXml>

export default function parseXml(rawXml: string) {
    const parser = new XMLParser();

    const data = parser.parse(rawXml);

    const groups = Object.entries(data.key_caps).map(([name, group]) => {
        if (group === '') {
            return { name, items: [] };
        }

        return {
            name,
            items: Object.values(group as { [key: string]: string }).map(
                (encodedDds) => decode(encodedDds)
            ),
        };
    });
    return groups;
}
