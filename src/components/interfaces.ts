export interface Document {
	exitFullscreen: () => Promise<void>;
	mozCancelFullScreen: () => Promise<void>;
	webkitExitFullscreen: () => Promise<void>;
	fullscreenElement: () => Promise<void>;
	mozFullScreenElement: () => Promise<void>;
	webkitFullscreenElement: () => Promise<void>;
}

export interface HTMLElement {
	mozRequestFullScreen: () => void;
	webkitRequestFullscreen: () => void;
	msRequestFullscreen: () => void;
}
