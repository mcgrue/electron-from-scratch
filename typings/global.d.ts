declare module '*.module.css';

interface Window {
  electronAPI: {
    appMinimize: () => void;
    appMaximize: () => void;
    appClose: () => void;
  };
}

declare module '*.module.css' {
  const classes: {[key: string]: string};
  export default classes;
}
