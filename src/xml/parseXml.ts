import { XMLParser } from 'npm:fast-xml-parser';
import decode from '../base64/decode.ts';

export type FileStructure = ReturnType<typeof parseXml>;

type InputGroup = {
    [key: string]: { '#text': string } | Controller[];
};

type Controller = {
    $guid: string;
    [key: string]: { '#text': string } | string;
};

export type ParsedController = {
    guid: string;
    items: Uint8Array[];
};

export default function parseXml(rawXml: string) {
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '$',
    });

    const data = parser.parse(rawXml);

    const groups = Object.entries(data.key_caps).map(([name, group]) => {
        if (group === '') {
            return { name, items: [] };
        }

        return {
            name,
            items: Object.values(group as InputGroup).map((item) => {
                // Buttons
                if ('#text' in item) {
                    return decode(item['#text'] as string);
                }
                // Controllers
                return item.map((controller) => ({
                    guid: controller.$guid,
                    items: Object.values(controller).flatMap(
                        (controllerItem) => {
                            if (typeof controllerItem === 'string') {
                                return [];
                            }
                            return decode(controllerItem['#text']);
                        }
                    ),
                }));
            }),
        };
    });
    return groups;
}
