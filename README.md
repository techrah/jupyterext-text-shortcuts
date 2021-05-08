# text-shortcuts

A jupyterlab extension to insert text via keyboard shortcuts.

![release](https://github.com/techrah/jupyterext-text-shortcuts/workflows/release/badge.svg?branch=master)

## Pre-requisites

* JupyterLab 1.1.3+, 2.x, 3.x
* [node 5+](https://nodejs.org)

## Installation

```bash
jupyter labextension install @techrah/text-shortcuts
```

or add it through your Jupyter Lab **Extensions** tab.

Then, add some user shortcuts:

- In Jupyter Lab, select **Settings** / **Advanced Settings Editor** from the menu.

- Select the **Keyboard Shortcuts** tab.

- In the **User Preferences** section, add your shortcuts configuration and click the "save" icon.

Here are two useful shortcuts for programming in R:

```json
{
  "shortcuts": [
    {
      "command": "text-shortcuts:insert-text",
      "args": {
        "kernel": "ir",
        "text": "%>%",
        "autoPad": true
      },
      "keys": [
        "Accel Shift M"
      ],
      "selector": "body"
    },
    {
      "command": "text-shortcuts:insert-text",
      "args": {
        "kernel": "ir",
        "text": "<-",
        "autoPad": true
      },
      "keys": [
        "Alt -"
      ],
      "selector": "body"
    }
  ]
}
```

**NOTE: As of version 0.1.x You do NOT need to add the above shortcuts to _User Preferences_ unless you want to override the default behaviour.** These two shortcuts are now installed by default. They can be found in _Keyboard Shortcuts / System Defaults_.

<img width="830" alt="@techrah:text-shortcuts_default-shortcuts" src="https://user-images.githubusercontent.com/600471/90961403-86083e00-e45d-11ea-85d7-c98c2b1cd2c9.png">

### Anatomy of a Text Shortcut

```
{
  ...
  "command": "text-shortcuts:insert-text"
  ...
}
```

Identifies the keyboard shortcut as a text shortcut that is intercepted by this extension.

```
{
  ...
  "keys": [
    "Accel Shift M"
  ],
  ...
}
```

`keys` is an array of keyboard shortcuts that activate the insertion of the text snippet. Each entry can be a combination of one or more of the following modifiers, ending with a text character. For example, "Accel Shift M" represents Command-Shift-M on macOS.

- `Accel` : Command (macOS) / Ctrl (Windows)
- `Alt`   : Option (macOS)  / Alt (Windows)
- `Shift` : Shift
- `Ctrl`  : Control

```
{
  ...
  "args": {
    "kernel": "ir",
    "text": "%>%",
    "autoPad": true
  }
  ...
}
```

- `kernel` (optional): If you specify a `kernel`, the shortcut will only work in notebooks that are running the specified kernel. Examples of kernel names are `ir` and `python3`. For a list of installed kernels, use `jupyter kernelspec list`.

- `text`: This is the actual text that you want inserted.

- `autoPad`: (`true` | `false`). If `true`, will add spacing either before, after, or both before and after so that there is a single space on each side of the text.

```
{
  ...
  "selector": "body"
  ...
}
```

CSS selector. Always use `"body"` for this extension.

## Development

### Pre-requisites

- node 5+
- Python 3.6+

It is strongly recommended that you set up a virtual Python environment. These instructions will assume that Anaconda is already installed.

- Create a new virtual environment and activate it.

  ```bash
  conda create --name text-shortcuts
  conda activate text-shortcuts
  ```

- Install jupyterlab

  ```bash
  conda install jupyterlab
  ```

- Clone this project and in the root of the project folder, install dependencies with the JupyterLab Package Manager

  ```bash
  jlpm
  ```

- Install the extension

  ```bash
  jupyter labextension install . --no-build
  ```

- Start up jupyter lab in watch mode. Don't forget to activate your virtual environment. If you want to use a different browser for development, specify that with the `--browser` switch. If you want to use a custom port, specify that with the `--port` switch.

  ```bash
  conda activate text-shortcuts
  jupyter lab --watch --browser="chrome" --port=8889
  ```

- In another terminal, run the TypeScript compiler in watch mode.

  ```bash
  conda activate text-shortcuts
  jlpm tsc -w
  ```

For more information on developing JupyterLab extensions, here are some helpful resources:

- [Extension Developer Guide][1]
- [Common Extension Points: Keyboard Shortcuts][2]
- [JupyterLab Extensions by Examples][3]
- [CodeMirror: Document management methods][4]
- [Interface INotebookTracker][5]

Pull requests are welcome!

[1]: https://jupyterlab.readthedocs.io/en/stable/extension/extension_dev.html
[2]: https://jupyterlab.readthedocs.io/en/stable/extension/extension_points.html#keyboard-shortcuts
[3]: https://github.com/jupyterlab/extension-examples
[4]: https://codemirror.net/doc/manual.html#api_doc
[5]: https://jupyterlab.github.io/jupyterlab/interfaces/_notebook_src_index_.inotebooktracker.html
