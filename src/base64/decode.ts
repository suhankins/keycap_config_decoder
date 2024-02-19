export default function decode(encodedText: string) {
    const dataArray = encodedText
        .split('')
        .map((character) => character.charCodeAt(0) - 0x3f);

    const byteArray: number[] = [];

    for (let i = 0; i < dataArray.length; i += 4) {
        const threeBytes =
            dataArray[i] +
            (dataArray[i + 1] << 6) +
            (dataArray[i + 2] << 12) +
            (dataArray[i + 3] << 18);

        byteArray.push(threeBytes & 0xff);
        byteArray.push((threeBytes >> 8) & 0xff);
        byteArray.push((threeBytes >> 16) & 0xff);
    }

    return new Uint8Array(byteArray);
}
