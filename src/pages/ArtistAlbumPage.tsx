import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import ThemedSectionHeader from '@/components/ThemedSectionHeader';
import PlayerControlsBar, { Song as PlayerSong } from '@/components/PlayerControlsBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Play, Clock, User, Disc } from 'lucide-react';
// Assuming MediaCard might be used if this page shows artist's other albums, or related artists.
// import MediaCard from '@/components/MediaCard';

interface SongData {
  id: string;
  title: string;
  artist: string; // Artist might be redundant if it's an artist page, but useful for album page under an artist
  duration: string;
  plays?: string; // Example: "1.5M plays"
  albumArtUrl?: string; // For individual tracks if different from main album
}

const sampleAlbumData = {
  id: 'albumXyz',
  name: 'Doraemon\'s Future Anthems',
  artist: 'The Future Gadgets Band',
  type: 'Album', // 'Album' or 'Artist'
  coverArtUrl: 'https://picsum.photos/seed/futureanthems/300/300',
  description: 'A collection of high-energy tracks celebrating the amazing gadgets from the future. Perfect for adventures across time and space!',
  releaseDate: '2024-01-15',
  tracks: [
    { id: 'tr1', title: 'Hopter Flight', artist: 'The Future Gadgets Band', duration: '3:10', plays: '2.1M', albumArtUrl: 'https://picsum.photos/seed/track1/40/40' },
    { id: 'tr2', title: 'Small Light, Big World', artist: 'The Future Gadgets Band', duration: '4:05', plays: '1.8M', albumArtUrl: 'https://picsum.photos/seed/track2/40/40' },
    { id: 'tr3', title: 'Dress-Up Camera Pop', artist: 'The Future Gadgets Band', duration: '2:50', plays: '3.0M', albumArtUrl: 'https://picsum.photos/seed/track3/40/40' },
    { id: 'tr4', title: 'Gourmet Table Groove', artist: 'The Future Gadgets Band', duration: '3:33', plays: '1.2M', albumArtUrl: 'https://picsum.photos/seed/track4/40/40' },
  ]
};
// Could also have sampleArtistData if type was 'Artist'

const ArtistAlbumPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>(); // Assuming this page primarily shows albums for now
  console.log(`ArtistAlbumPage loaded for ID: ${albumId}, type: Album`);

  // In a real app, fetch data based on albumId (or artistId and type)
  const [mediaDetails, setMediaDetails] = useState(sampleAlbumData);
  const [currentSong, setCurrentSong] = useState<PlayerSong | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    // Simulate fetching data
    console.log("Fetching data for album: ", albumId);
    setMediaDetails(sampleAlbumData); // Placeholder
  }, [albumId]);

  const handlePlayPause = () => { if (currentSong) setIsPlaying(!isPlaying); };
  const handleSkipNext = () => console.log('Skip Next');
  const handleSkipPrevious = () => console.log('Skip Previous');
  const handleSeek = (newProgress: number) => setProgress(newProgress);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

  const playTrack = (track: SongData) => {
    setCurrentSong({
      title: track.title,
      artist: mediaDetails.artist, // Album artist
      albumArtUrl: track.albumArtUrl || mediaDetails.coverArtUrl,
      durationSeconds: parseInt(track.duration.split(':')[0]) * 60 + parseInt(track.duration.split(':')[1])
    });
    setIsPlaying(true);
    setProgress(0);
  };
  
  const pageIcon = mediaDetails.type === 'Album' ? <Disc className="mr-2 h-5 w-5" /> : <User className="mr-2 h-5 w-5" />;

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
                    <Link to="/search" className={navigationMenuTriggerStyle()}>Search</Link>
                </NavigationMenuItem>
            </NavigationMenuList>
           </NavigationMenu>
        </header>
        <ScrollArea className="flex-1 pb-28">
          <div className="p-6">
             <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8 p-6 bg-gradient-to-b from-yellow-300 to-yellow-100 rounded-lg shadow-lg">
              <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 shadow-xl rounded-md">
                <AspectRatio ratio={1/1} className="bg-muted rounded-md overflow-hidden">
                  <img src={mediaDetails.coverArtUrl} alt={mediaDetails.name} className="object-cover w-full h-full" />
                </AspectRatio>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-sm font-semibold text-yellow-700 uppercase flex items-center justify-center md:justify-start">
                    {pageIcon} {mediaDetails.type}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 truncate my-2">{mediaDetails.name}</h1>
                {mediaDetails.type === 'Album' && <p className="text-lg text-gray-700">By <Link to={`/artist/${mediaDetails.artist.replace(/\s+/g, '-').toLowerCase()}`} className="hover:underline font-semibold">{mediaDetails.artist}</Link></p>}
                <p className="text-gray-600 text-sm mt-1">{mediaDetails.description}</p>
                <p className="text-xs text-gray-500 mt-2">Released: {mediaDetails.releaseDate} • {mediaDetails.tracks.length} tracks</p>
                 <div className="mt-6 flex gap-4 justify-center md:justify-start">
                    <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => mediaDetails.tracks.length > 0 && playTrack(mediaDetails.tracks[0])}>
                        <Play className="mr-2 h-5 w-5" /> Play {mediaDetails.type}
                    </Button>
                    <Button variant="outline" size="lg">
                        Follow
                    </Button>
                </div>
              </div>
            </div>

            <ThemedSectionHeader title="Tracks" themeColorClass="bg-red-100 border-red-500" />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Plays</TableHead>
                  <TableHead className="text-right"><Clock size={16} /></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mediaDetails.tracks.map((track, index) => (
                  <TableRow key={track.id} className="group hover:bg-gray-200 cursor-pointer" onClick={() => playTrack(track)}>
                    <TableCell className="text-gray-500">{index + 1}</TableCell>
                    <TableCell className="font-medium flex items-center">
                         {track.albumArtUrl && <img src={track.albumArtUrl} alt={track.title} className="w-10 h-10 rounded mr-3 object-cover"/>}
                         <div>
                            <p>{track.title}</p>
                            {mediaDetails.type === 'Artist' && <p className="text-xs text-gray-500">{track.artist}</p>}
                         </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-gray-500">{track.plays}</TableCell>
                    <TableCell className="text-right text-gray-500">{track.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* If artist page, could list albums here using MediaCard */}
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

export default ArtistAlbumPage;