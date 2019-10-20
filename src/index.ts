import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';


/**
 * Initialization data for the text-shortcuts extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'text-shortcuts',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension text-shortcuts is activated!');
  }
};

export default extension;
