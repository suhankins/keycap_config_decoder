import encode from '../base64/encode.ts';

export interface Groups {
    key_caps: KeyCaps;
}

interface KeyCaps {
    [key: string]: Group;
}

interface Group {
    [key: string]: { $BinSize: number; data: string };
}

export default async function readFileStructure(path: string) {
    let groups: KeyCaps = {};

    for await (const dirEntry of Deno.readDir(path)) {
        if (!dirEntry.isDirectory) continue;

        let group: Group = {};

        const groupPath = path + `/${dirEntry.name}`;

        for await (const groupEntry of Deno.readDir(groupPath)) {
            if (!groupEntry.isFile) continue;
            const file = await Deno.readFile(groupPath + `/${groupEntry.name}`);
            const name = groupEntry.name.split('.')[0];

            group = {
                ...group,
                [name]: {
                    $BinSize: file.byteLength,
                    data: encode(file),
                },
            };
        }

        groups = { ...groups, [dirEntry.name]: group };
    }

    return { key_caps: groups };
}
