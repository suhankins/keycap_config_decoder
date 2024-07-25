/**
 * @example const array = new TextEncoder().encode("Hello, World!") // Uint8Array(13) [72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]
 * encode(array) // "GTEZk|EJ_[tZqpEX`???"
 */
export default function encode(dataArray: Uint8Array): string {
    const encodedText: string[] = [];

    for (let i = 0; i < dataArray.length; i += 3) {
        const threeBytes =
            dataArray[i] + (dataArray[i + 1] << 8) + (dataArray[i + 2] << 16);

        for (let j = 0; j < 4; j++) {
            encodedText.push(
                String.fromCharCode(((threeBytes >> (6 * j)) & 0x3f) + 0x3f)
            );
        }
    }

    return encodedText.join('');
}
