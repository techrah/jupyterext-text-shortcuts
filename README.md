# text-shortcuts

A jupyterlab extension to insert text via keyboard shortcuts.

![release](https://github.com/ryanhomer/jupyterext-text-shortcuts/workflows/release/badge.svg?branch=master)

## Pre-requisites

* JupyterLab
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

## Development

### Pre-requisites

- node 5+
- Python 3.6+

It is strongly recommended that you set up a virtual Python environment. These instructions will assume that Anaconda is already installed.

- Create a new virtual environment

  ```bash
  conda create --name text-shortcuts
  ```

  The new environment will be activated automatically. If not, `conda activate text-shortcuts`.

- Install jupyterlab

  ```bash
  conda install jupyterlab
  ```

- Clone this project and in the root of the project folder, install dependencies

  ```bash
  jypl
  ```

- Install the extension

  ```bash
  jupyter labextension install . --no-build
  ```

- In a separate terminal, start up jupyter lab in watch mode. Don't forget to activate your virtual environment. If you want to use a different browser for development, specify that with the `--browser` switch. If you want to use a custom port, specify that with the `--port` switch.

  ```bash
  conda activate text-shortcuts
  jupyter lab --watch --browser="chrome" --port=8889
  ```

Pull requests are welcome!
