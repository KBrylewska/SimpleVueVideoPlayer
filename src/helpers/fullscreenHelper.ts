import { IDocument, IHTMLElement } from './interfaces';

export const fullScreenHelper = {
    closeFullScreen: (extendedDocument: IDocument) => {
        if (extendedDocument.exitFullscreen) {
            extendedDocument.exitFullscreen();
        } else if (extendedDocument.mozExitFullscreen) {
            extendedDocument.mozExitFullscreen();
        } else if (extendedDocument.webkitExitFullscreen) {
            extendedDocument.webkitExitFullscreen();
        } else if (extendedDocument.msExitFullscreen) {
            extendedDocument.msExitFullscreen();
        }
    },
    openFullScreen: (container: IHTMLElement) => {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.mozRequestFullScreen) {
            container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
            container.msRequestFullscreen();
        }
    },
};
