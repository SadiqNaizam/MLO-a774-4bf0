import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, ListMusic
} from 'lucide-react'; // Doraemon's bell color for accents?
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Song {
  title: string;
  artist: string;
  albumArtUrl: string;
  durationSeconds?: number; // For progress calculation
}

interface PlayerControlsBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progressPercent: number; // 0-100
  volumePercent: number; // 0-100
  onPlayPause: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
  onSeek: (newProgressPercent: number) => void;
  onVolumeChange: (newVolumePercent: number) => void;
  onToggleMute?: () => void; // Optional
  isMuted?: boolean; // Optional
}

const PlayerControlsBar: React.FC<PlayerControlsBarProps> = ({
  currentSong,
  isPlaying,
  progressPercent,
  volumePercent,
  onPlayPause,
  onSkipNext,
  onSkipPrevious,
  onSeek,
  onVolumeChange,
  onToggleMute,
  isMuted,
}) => {
  console.log("Rendering PlayerControlsBar. Current song:", currentSong?.title);

  // Doraemon theme colors (placeholders for controls)
  const controlButtonClass = "text-gray-700 hover:text-blue-500"; // Doraemon blue for hover
  const playButtonBgClass = isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"; // Bell red for pause, Doraemon blue for play

  const formatTime = (seconds: number | undefined) => {
    if (seconds === undefined) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  const currentTime = currentSong?.durationSeconds ? (progressPercent / 100) * currentSong.durationSeconds : 0;

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 grid grid-cols-3 items-center gap-4">
      {/* Left: Song Info */}
      <div className="flex items-center space-x-3">
        {currentSong ? (
          <>
            <div className="w-12 h-12 flex-shrink-0">
              <AspectRatio ratio={1/1} className="bg-muted rounded">
                <img src={currentSong.albumArtUrl || '/placeholder.svg'} alt={currentSong.title} className="w-full h-full object-cover rounded" />
              </AspectRatio>
            </div>
            <div>
              <p className="text-sm font-semibold truncate">{currentSong.title}</p>
              <p className="text-xs text-gray-500 truncate">{currentSong.artist}</p>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-400">No song playing</div>
        )}
      </div>

      {/* Center: Playback Controls & Progress */}
      <div className="flex flex-col items-center space-y-1">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onSkipPrevious} className={controlButtonClass} aria-label="Previous track" disabled={!currentSong}>
            <SkipBack size={20} />
          </Button>
          <Button
            variant="default" // More prominent
            size="icon"
            onClick={onPlayPause}
            className={`rounded-full w-10 h-10 ${playButtonBgClass} text-white`}
            aria-label={isPlaying ? "Pause" : "Play"}
            disabled={!currentSong}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onSkipNext} className={controlButtonClass} aria-label="Next track" disabled={!currentSong}>
            <SkipForward size={20} />
          </Button>
        </div>
        <div className="w-full max-w-md flex items-center space-x-2">
            <span className="text-xs text-gray-500 w-8 text-right">{formatTime(currentTime)}</span>
            <Slider
                value={[progressPercent]}
                max={100}
                step={1}
                onValueChange={(value) => onSeek(value[0])}
                className="w-full"
                disabled={!currentSong}
                aria-label="Song progress"
            />
            <span className="text-xs text-gray-500 w-8 text-left">{formatTime(currentSong?.durationSeconds)}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center justify-end space-x-2">
        <Button variant="ghost" size="icon" onClick={onToggleMute} className={controlButtonClass} aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted || volumePercent === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>
        <Slider
          value={[volumePercent]}
          max={100}
          step={1}
          onValueChange={(value) => onVolumeChange(value[0])}
          className="w-24"
          aria-label="Volume"
        />
        <Button variant="ghost" size="icon" className={controlButtonClass} aria-label="Queue">
          <ListMusic size={18} />
        </Button>
        <Button variant="ghost" size="icon" className={controlButtonClass} aria-label="Full screen player">
          <Maximize2 size={18} />
        </Button>
      </div>
    </footer>
  );
}
export default PlayerControlsBar;