export interface IState {
    paused: boolean;
    position: number;
    volume: number;
    muted: boolean;
    fullScreen: boolean;
    player: HTMLVideoElement;
    duration: number;
    resize: boolean;
}

export const state: IState = {
    paused: true,
    position: 1,
    volume: 1,
    muted: false,
    fullScreen: false,
    player: null,
    duration: 0,
    resize: false,
};
