export type Playlist = Array<Track>;

export type Track = {
  audioSrc: string;
  metadata: TrackMetadata;
};

export type TrackMetadata = {
  writer: string;
  title: string;
  image: string;
};

/* === Audio control Controls === */
export type Controls = {
  setPlaybackPosition: (position: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  togglePlayPause: () => void;
  playNextTrack: () => void;
  playPreviousTrack: () => void;
  cleanup: () => void;
  muteSound: () => void;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/* === Playerstate === */
export type PlayerState = {
  currentTrackDuration: number | null;
  currentTrackPlaybackPosition: number | null;
  currentTrackMetadata: TrackMetadata | null;
  playbackState: PlaybackState;
  repeat: boolean;
  shuffle: boolean;
};

export type PlaybackState = "PLAYING" | "PAUSED";

export const InitialPlayerState: PlayerState = {
  currentTrackDuration: null,
  currentTrackPlaybackPosition: null,
  currentTrackMetadata: null,
  playbackState: "PAUSED",
  repeat: false,
  shuffle: false,
};

export interface VolumebarProps {
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface MusicLeftPartProps extends VolumebarProps {
  muteSound: () => void;
}