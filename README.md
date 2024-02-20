# keycap_config.xml Decoder

Decodes and encodes `keycap_config.xml` file, found in a bunch of Sega games like Crazy Taxi, Sonic Adventure DX, Valkyria Chronicles, and others. It stores generated keyboard and Xbox controller button icons to be used in-game.

## Guide

1. Run the game at least once, so it generates `keycap_config.xml`
2. Drag and drop `keycap_config.xml` on the `keycapConfig.exe`. This will create a folder called `output-[current date]`
3. Find icons in generated folders that you want to change. Icons are in `.DDS`, so you will either need to use [GIMP](https://www.gimp.org/), which supports DDS out of the box, or download [Nvidia plugin](https://developer.nvidia.com/nvidia-texture-tools-exporter) for Photoshop.
4. Once you overwrite icons you want to change, drag and drop your `output-[current date]` on the `keycapConfig.exe`. This will create a file called `keycap_config-[current date].xml`
5. Remove `-[current date]` from file's name and replace original `keycap_config.xml` with it
6. Game can potentially overwrite our file, which we don't want, so it's best to right click your `keycap_config.xml`, go to properties, and check "Read-only" checkbox

>[!NOTE]
>Edited icons might not appear in some places (i.e. configuration app, save file menu in Valkyria Chronicles).

## Usage

Just drag-and-dropping files and folders on the executable should work, but you can also use it with your terminal emulator.

If you `git clone`d this repo instead of using executable, replace every mention of `keycapConfig` with `deno task run`.

### Decoding keycap_config.xml

```sh
keycapConfig <xml_file> [output_directory]
```

By default, output directory will be set to `./output-[current_time]`

Examples:
```sh
keycapConfig ./keycap_config.xml
keycapConfig ./keycap_config.xml ./output
```

### Encoding new keycap_config.xml

```sh
keycapConfig <directory> [output_file]
```

By default, output file will be set to `./keycap_config-[current_time]`

Examples:
```sh
keycapConfig ./output
keycapConfig ./output ./keycap_config.xml
```

## License

The Unlicense.
