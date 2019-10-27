# text-shortcuts

Insert text via shortcuts.


## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install @techrah/text-shortcuts
```

or add it through your Jupyter Lab **Extensions** tab.

Then, add some user shortcuts:

- In Jupyter Lab, select **Settings** / **Advanced Settings Editor** from the menu.

- Select the **Keyboard Shortcuts** tab.

- In the **User Preferences** section, add your shortcuts configuration and click the Save icon.
 
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

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
npm run build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

