import React from 'react';
import { Play, MoreHorizontal, CheckCircle, Music2 } from 'lucide-react'; // Music2 as placeholder
import { Button } from '@/components/ui/button';

interface Song {
  id: string;
  title: string;
  artist: string;
  albumArtUrl?: string; // Optional, small album art
  duration?: string;   // e.g., "3:45"
}

interface SongListItemProps {
  song: Song;
  isPlaying?: boolean; // If this specific song is the one currently playing
  isCurrentTrack?: boolean; // If this song is the one loaded in player (might be paused)
  onPlay: (songId: string) => void;
  onQueue?: (songId: string) => void; // Optional: Add to queue action
  onOptions?: (songId: string, event: React.MouseEvent) => void; // For dropdown menu
}

const SongListItem: React.FC<SongListItemProps> = ({
  song,
  isPlaying,
  isCurrentTrack,
  onPlay,
  onQueue,
  onOptions,
}) => {
  console.log("Rendering SongListItem:", song.title, "isPlaying:", isPlaying);

  // Doraemon theme: highlight color for current/hovered song
  const activeClass = isCurrentTrack ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"; // Doraemon blue for active
  const playIconColor = isCurrentTrack && isPlaying ? "text-green-500" : "text-gray-500";

  return (
    <div
      className={`flex items-center p-2 rounded-md transition-colors duration-150 ${activeClass} group cursor-pointer`}
      onClick={() => { if (!isPlaying) onPlay(song.id); }} // Play if not already playing this specific track
      role="button"
      tabIndex={0}
      aria-label={`Play ${song.title} by ${song.artist}`}
    >
      {/* Album Art or Placeholder Icon */}
      <div className="w-10 h-10 flex-shrink-0 mr-3 rounded overflow-hidden bg-gray-200 flex items-center justify-center">
        {song.albumArtUrl ? (
          <img src={song.albumArtUrl} alt={song.title} className="w-full h-full object-cover" />
        ) : (
          <Music2 size={20} className="text-gray-400" />
        )}
      </div>

      {/* Play/Pause icon (shows on hover or if current track) */}
      <div className="mr-3 w-6 flex items-center justify-center">
        {isCurrentTrack && isPlaying ? (
           <CheckCircle size={20} className="text-green-500" /> // Or some "playing" indicator
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className={`w-8 h-8 ${playIconColor} opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity`}
            onClick={(e) => { e.stopPropagation(); onPlay(song.id); }}
            aria-label={isPlaying && isCurrentTrack ? `Pause ${song.title}` : `Play ${song.title}`}
          >
            <Play size={20} />
          </Button>
        )}
      </div>
      
      <div className="flex-grow">
        <p className={`text-sm font-medium ${isCurrentTrack ? 'font-semibold' : ''} truncate`}>{song.title}</p>
        <p className="text-xs text-gray-500 truncate">{song.artist}</p>
      </div>

      {song.duration && <p className="text-xs text-gray-500 mr-3 w-10 text-right">{song.duration}</p>}

      {onOptions && (
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
          onClick={(e) => { e.stopPropagation(); onOptions(song.id, e); }}
          aria-label="More options"
        >
          <MoreHorizontal size={20} />
        </Button>
      )}
    </div>
  );
}
export default SongListItem;