import encode from '../base64/encode.ts';

export interface Groups {
    key_caps: KeyCaps;
}

interface KeyCaps {
    [key: string]: Group;
}

interface Group {
    [key: string]: { $BinSize: number; data: string } | Group[] | string;
}

async function readFileIntoGroup(
    groupPath: string,
    name: string,
    group: Group
) {
    const file = await Deno.readFile(groupPath + `/${name}`);
    const keyName = name.split('.')[0];

    return {
        ...group,
        [keyName]: {
            $BinSize: file.byteLength,
            data: encode(file),
        },
    };
}

export default async function readFileStructure(path: string) {
    let groups: KeyCaps = {};

    for await (const dirEntry of Deno.readDir(path)) {
        if (!dirEntry.isDirectory) {
            continue;
        }

        let group: Group = {};

        const groupPath = path + `/${dirEntry.name}`;

        for await (const groupEntry of Deno.readDir(groupPath)) {
            if (groupEntry.isFile) {
                if (groupEntry.name.split('.').at(-1)?.toLowerCase() !== 'dds') {
                    continue;
                }
                group = await readFileIntoGroup(
                    groupPath,
                    groupEntry.name,
                    group
                );
            } else {
                const controllerPath = groupPath + `/${groupEntry.name}`;
                let controller: Group = {
                    '$guid': groupEntry.name
                };
                for await (const controllerEntry of Deno.readDir(
                    controllerPath
                )) {
                    controller = await readFileIntoGroup(
                        controllerPath,
                        controllerEntry.name,
                        controller
                    );
                }
                group.controller = [
                    ...(Array.isArray(group.controller)
                        ? group.controller
                        : []),
                    controller,
                ];
            }
        }

        groups = { ...groups, [dirEntry.name]: group };
    }

    return { key_caps: groups };
}
