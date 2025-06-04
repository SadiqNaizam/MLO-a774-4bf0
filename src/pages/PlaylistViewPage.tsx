import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import PlayerControlsBar, { Song as PlayerSong } from '@/components/PlayerControlsBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Play, Clock, PlusCircle, Edit3 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';


interface SongData {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  albumArtUrl?: string;
}

const samplePlaylistDetails = {
  id: 'pl1',
  name: 'Doraemon\'s Pocket Party Mix',
  description: 'A collection of the most upbeat and fun songs from Doraemon and friends. Perfect for any adventure!',
  coverArtUrl: 'https://picsum.photos/seed/pocketparty/300/300',
  tracks: [
    { id: 't1', title: 'Doraemon March', artist: 'Nobita', album: 'Doraemon Movie Themes', duration: '2:55', albumArtUrl: 'https://picsum.photos/seed/dora1/40/40' },
    { id: 't2', title: 'Gadget Groove', artist: 'Doraemon', album: 'Future Sounds', duration: '3:20', albumArtUrl: 'https://picsum.photos/seed/dora2/40/40' },
    { id: 't3', title: 'Anywhere Door Beat', artist: 'Shizuka', album: 'Travel Tunes', duration: '4:00', albumArtUrl: 'https://picsum.photos/seed/dora3/40/40' },
    { id: 't4', title: 'Time Machine Tempo', artist: 'Suneo', album: 'Chronos Collection', duration: '3:45', albumArtUrl: 'https://picsum.photos/seed/dora4/40/40' },
    { id: 't5', title: 'Giant\'s Anthem', artist: 'Gian', album: 'Big Voice Hits', duration: '2:30', albumArtUrl: 'https://picsum.photos/seed/dora5/40/40' },
  ]
};

const PlaylistViewPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  console.log(`PlaylistViewPage loaded for playlist ID: ${playlistId}`);

  const [playlist, setPlaylist] = useState(samplePlaylistDetails); // In a real app, fetch by ID
  const [currentSong, setCurrentSong] = useState<PlayerSong | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(samplePlaylistDetails.description);


  useEffect(() => {
    // Simulate fetching playlist data based on playlistId
    // For now, we just use the sample data
    console.log("Fetching data for playlist: ", playlistId);
    setPlaylist(samplePlaylistDetails);
    setDescription(samplePlaylistDetails.description);
  }, [playlistId]);

  const handlePlayPause = () => { if (currentSong) setIsPlaying(!isPlaying); };
  const handleSkipNext = () => console.log('Skip Next');
  const handleSkipPrevious = () => console.log('Skip Previous');
  const handleSeek = (newProgress: number) => setProgress(newProgress);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

  const playTrack = (track: SongData) => {
    setCurrentSong({
      title: track.title,
      artist: track.artist,
      albumArtUrl: track.albumArtUrl || playlist.coverArtUrl,
      durationSeconds: parseInt(track.duration.split(':')[0]) * 60 + parseInt(track.duration.split(':')[1]) //簡易変換
    });
    setIsPlaying(true);
    setProgress(0);
  };

  const handleSaveDescription = () => {
    // In a real app, send this to a backend
    console.log("Saving new description:", description);
    setPlaylist(prev => ({...prev, description: description}));
    setIsEditingDescription(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-60 flex-1 flex flex-col overflow-hidden">
        <header className="p-4 bg-white border-b border-gray-200">
           <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/home" className={navigationMenuTriggerStyle()}>Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/library" className={navigationMenuTriggerStyle()}>Library</Link>
                </NavigationMenuItem>
            </NavigationMenuList>
           </NavigationMenu>
        </header>
        <ScrollArea className="flex-1 pb-28">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8 p-6 bg-gradient-to-b from-blue-300 to-blue-100 rounded-lg shadow-lg">
              <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 shadow-xl rounded-md">
                <AspectRatio ratio={1/1} className="bg-muted rounded-md overflow-hidden">
                  <img src={playlist.coverArtUrl} alt={playlist.name} className="object-cover w-full h-full" />
                </AspectRatio>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-sm font-semibold text-blue-700">PLAYLIST</p>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 truncate my-2">{playlist.name}</h1>
                {isEditingDescription ? (
                    <div className="mt-2">
                        <Textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-white"
                            rows={3}
                        />
                        <Button onClick={handleSaveDescription} size="sm" className="mt-2 bg-green-500 hover:bg-green-600">Save</Button>
                        <Button onClick={() => setIsEditingDescription(false)} variant="ghost" size="sm" className="mt-2 ml-2">Cancel</Button>
                    </div>
                ) : (
                    <div className="group relative">
                        <p className="text-gray-600 text-sm mt-1">{description}</p>
                        <Button variant="ghost" size="icon" className="absolute top-0 right-0 opacity-0 group-hover:opacity-100" onClick={() => setIsEditingDescription(true)}>
                            <Edit3 size={16} />
                        </Button>
                    </div>
                )}
                <p className="text-xs text-gray-500 mt-2">Created by You • {playlist.tracks.length} songs</p>
                <div className="mt-6 flex gap-4 justify-center md:justify-start">
                    <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => playlist.tracks.length > 0 && playTrack(playlist.tracks[0])}>
                        <Play className="mr-2 h-5 w-5" /> Play
                    </Button>
                    <Button variant="outline" size="lg">
                        <PlusCircle className="mr-2 h-5 w-5" /> Add Songs
                    </Button>
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Artist</TableHead>
                  <TableHead>Album</TableHead>
                  <TableHead className="text-right"><Clock size={16} /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playlist.tracks.map((track, index) => (
                  <TableRow key={track.id} className="group hover:bg-gray-200 cursor-pointer" onClick={() => playTrack(track)}>
                    <TableCell className="text-gray-500">{index + 1}</TableCell>
                    <TableCell className="font-medium flex items-center">
                        {track.albumArtUrl && <img src={track.albumArtUrl} alt={track.title} className="w-10 h-10 rounded mr-3 object-cover"/>}
                        {track.title}
                    </TableCell>
                    <TableCell>{track.artist}</TableCell>
                    <TableCell>{track.album}</TableCell>
                    <TableCell className="text-right text-gray-500">{track.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>
      <PlayerControlsBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        progressPercent={progress}
        volumePercent={volume}
        onPlayPause={handlePlayPause}
        onSkipNext={handleSkipNext}
        onSkipPrevious={handleSkipPrevious}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
};

export default PlaylistViewPage;