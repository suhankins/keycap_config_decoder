/**
 * @example const decoded = decode("GTEZk|EJ_[tZqpEX`???") // Uint8Array(15) [72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33, 0, 0]
 * new TextDecoder().decode(decoded) // "Hello, World!"
 */
export default function decode(encodedText: string): Uint8Array {
    const dataArray = encodedText
        .split('')
        .map((character) => character.charCodeAt(0) - 0x3f);

    const byteArray: number[] = [];

    for (let i = 0; i < dataArray.length; i += 4) {
        // 6 bits per letter * 3 = 24 bits = 3 bytes
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
