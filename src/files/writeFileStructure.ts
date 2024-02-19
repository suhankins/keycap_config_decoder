import type { FileStructure, ParsedController } from '../xml/parseXml.ts';

async function writeToFile(
    folderPath: string,
    index: number,
    data: Uint8Array
) {
    await Deno.writeFile(folderPath + `/k1_${index}.dds`, data);
}

async function handleController(controller: ParsedController, path: string) {
    const controllerPath = path + `/${controller.guid}`;
    await Deno.mkdir(controllerPath, {
        recursive: true,
    });
    await Promise.all(
        controller.items.map((controllerItem, index) =>
            writeToFile(controllerPath, index, controllerItem)
        )
    );
}

export default async function writeFileStructure(
    path: string,
    structure: FileStructure
) {
    for (const group of structure) {
        const folderPath = path + `/${group.name}`;
        await Deno.mkdir(folderPath, {
            recursive: true,
        });
        await Promise.all(
            group.items.flatMap((item, index) => {
                if (item instanceof Uint8Array) {
                    return writeToFile(folderPath, index, item);
                }
                return Promise.all(
                    item.map((controller) =>
                        handleController(controller, folderPath)
                    )
                );
            })
        );
    }
}
