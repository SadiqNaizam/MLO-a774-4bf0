import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import PlayerControlsBar, { Song as PlayerSong } from '@/components/PlayerControlsBar';
import SongListItem, { Song as SongListItemSong } from '@/components/SongListItem';
import MediaCard from '@/components/MediaCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';

const sampleSongs: SongListItemSong[] = [
  { id: 's1', title: 'Doraemon no Uta', artist: 'Kumiko Osugi', duration: '3:15', albumArtUrl: 'https://picsum.photos/seed/doraemonuta/50/50' },
  { id: 's2', title: 'Boku Doraemon', artist: 'Nobuyo Ōyama', duration: '2:50', albumArtUrl: 'https://picsum.photos/seed/bokudora/50/50' },
  { id: 's3', title: 'Aoi Sora wa Pocket sa', artist: 'Kumiko Osugi', duration: '3:05', albumArtUrl: 'https://picsum.photos/seed/aoisora/50/50' },
];

const sampleAlbums = [
  { id: 'al1', imageUrl: 'https://picsum.photos/seed/doraalbum1/150/150', title: 'Doraemon\'s Greatest Hits', subtitle: 'Classic Doraemon', type: 'Album' as const },
  { id: 'al2', imageUrl: 'https://picsum.photos/seed/nobitaalbum/150/150', title: 'Nobita\'s Study Beats', subtitle: 'Lo-fi for focus', type: 'Album' as const },
];

const sampleArtists = [
  { id: 'ar1', imageUrl: 'https://picsum.photos/seed/kumiko/150/150', title: 'Kumiko Osugi', subtitle: 'Original Doraemon Singer', type: 'Artist' as const },
  { id: 'ar2', imageUrl: 'https://picsum.photos/seed/nobuyo/150/150', title: 'Nobuyo Ōyama', subtitle: 'Voice of Doraemon', type: 'Artist' as const },
];

const SearchPage: React.FC = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSong, setCurrentSong] = useState<PlayerSong | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);

  const handlePlayPause = () => { if (currentSong) setIsPlaying(!isPlaying); };
  const handleSkipNext = () => console.log('Skip Next');
  const handleSkipPrevious = () => console.log('Skip Previous');
  const handleSeek = (newProgress: number) => setProgress(newProgress);
  const handleVolumeChange = (newVolume: number) => setVolume(newVolume);

  const playSong = (song: SongListItemSong) => {
    setCurrentSong({
      title: song.title,
      artist: song.artist,
      albumArtUrl: song.albumArtUrl || 'https://picsum.photos/seed/defaultart/50/50',
      durationSeconds: 180 // Placeholder
    });
    setIsPlaying(true);
    setProgress(0);
  };
  
  const playMedia = (item: { title: string; subtitle?: string; imageUrl: string }) => {
    setCurrentSong({
      title: item.title,
      artist: item.subtitle || 'Various Artists',
      albumArtUrl: item.imageUrl,
      durationSeconds: 180 // Placeholder duration
    });
    setIsPlaying(true);
    setProgress(0);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-60 flex-1 flex flex-col overflow-hidden">
         <header className="p-4 bg-white border-b border-gray-200">
            <NavigationMenu className="justify-between">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/home" className={navigationMenuTriggerStyle()}>
                    Home
                  </Link>
                </NavigationMenuItem>
                {/* Add other menu items as needed */}
              </NavigationMenuList>
              <div className="relative w-full max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                    type="search"
                    placeholder="Search for songs, artists, albums..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </NavigationMenu>
        </header>
        <ScrollArea className="flex-1 p-6 pb-28">
          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="tracks">Tracks</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
            </TabsList>
            <TabsContent value="tracks">
              <div className="space-y-2">
                {sampleSongs
                  .filter(song => song.title.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(song => (
                  <SongListItem
                    key={song.id}
                    song={song}
                    onPlay={() => playSong(song)}
                    isCurrentTrack={currentSong?.title === song.title && currentSong?.artist === song.artist}
                    isPlaying={currentSong?.title === song.title && currentSong?.artist === song.artist && isPlaying}
                    onOptions={(songId, e) => console.log('Options for song:', songId, e.clientX)}
                  />
                ))}
                {sampleSongs.filter(song => song.title.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && <p>No tracks found for "{searchTerm}".</p>}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {sampleAlbums
                  .filter(album => album.title.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(album => (
                  <MediaCard key={album.id} {...album} onPlay={() => playMedia(album)} onClick={() => console.log('Album clicked:', album.id)} />
                ))}
                 {sampleAlbums.filter(album => album.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && <p>No albums found for "{searchTerm}".</p>}
              </div>
            </TabsContent>
            <TabsContent value="artists">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {sampleArtists
                  .filter(artist => artist.title.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(artist => (
                  <MediaCard key={artist.id} {...artist} onPlay={() => playMedia(artist)} onClick={() => console.log('Artist clicked:', artist.id)} />
                ))}
                {sampleArtists.filter(artist => artist.title.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && <p>No artists found for "{searchTerm}".</p>}
              </div>
            </TabsContent>
            <TabsContent value="playlists">
              <p className="text-gray-500">Playlist search results for "{searchTerm}" would appear here.</p>
              {/* Placeholder for playlist results, perhaps using MediaCard */}
            </TabsContent>
          </Tabs>
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

export default SearchPage;