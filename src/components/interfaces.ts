export interface IDocument extends Document {
    exitFullscreen: () => Promise<void>;
    mozCancelFullScreen: () => void;
    webkitExitFullscreen: () => void;
    fullscreenElement: () => void;
    mozFullScreenElement: () => void;
    webkitFullscreenElement: () => void;
    mozExitFullscreen: () => Promise<void>;
    msExitFullscreen: () => Promise<void>;
}

export interface IHTMLElement extends HTMLElement {
    mozRequestFullScreen: () => void;
    webkitRequestFullscreen: () => void;
    msRequestFullscreen: () => void;
}
