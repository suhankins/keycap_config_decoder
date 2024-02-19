import type { FileStructure } from '../xml/parseXml.ts';

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
            group.items.map((item, index) =>
                Deno.writeFile(folderPath + `/k1_${index}.dds`, item)
            )
        );
    }
}
