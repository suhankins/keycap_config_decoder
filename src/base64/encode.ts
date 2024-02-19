export default function encode(dataArray: Uint8Array) {
    const encodedText: string[] = [];

    for (let i = 0; i < dataArray.length; i += 3) {
        const threeBytes =
            dataArray[i] + (dataArray[i + 1] << 8) + (dataArray[i + 2] << 16);

        encodedText.push(String.fromCharCode((threeBytes & 0x3f) + 0x3f));
        encodedText.push(String.fromCharCode(((threeBytes >> 6) & 0x3f) + 0x3f));
        encodedText.push(String.fromCharCode(((threeBytes >> 12) & 0x3f) + 0x3f));
        encodedText.push(String.fromCharCode(((threeBytes >> 18) & 0x3f) + 0x3f));
    }

    return encodedText.join('');
}
