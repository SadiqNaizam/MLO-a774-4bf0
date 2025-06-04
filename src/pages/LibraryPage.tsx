import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ThemedSectionHeader from '@/components/ThemedSectionHeader';
import PlayerControlsBar, { Song as PlayerSong } from '@/components/PlayerControlsBar';
import SongListItem, { Song as SongListItemSong } from '@/components/SongListItem';
import MediaCard from '@/components/MediaCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';

const likedSongs: SongListItemSong[] = [
  { id: 'ls1', title: 'Yume wo Kanaete Doraemon', artist: 'MAO', duration: '4:05', albumArtUrl: 'https://picsum.photos/seed/yumekanaete/50/50' },
  { id: 'ls2', title: 'Tomodachi no Uta', artist: 'BUMP OF CHICKEN', duration: '5:10', albumArtUrl: 'https://picsum.photos/seed/tomodachi/50/50' },
];

const userPlaylists = [
  { id: 'upl1', imageUrl: 'https://picsum.photos/seed/userpl1/150/150', title: 'My Doraemon Favorites', subtitle: '15 songs', type: 'Playlist' as const },
  { id: 'upl2', imageUrl: 'https://picsum.photos/seed/userpl2/150/150', title: 'Relaxing Gadget Sounds', subtitle: '8 tracks', type: 'Playlist' as const },
];

const followedArtists = [
    { id: 'fa1', imageUrl: 'https://picsum.photos/seed/artist-genhoshino/150/150', title: 'Gen Hoshino', subtitle: 'Pop Sensation', type: 'Artist' as const },
    { id: 'fa2', imageUrl: 'https://picsum.photos/seed/artist-aimer/150/150', title: 'Aimer', subtitle: 'Powerhouse Vocals', type: 'Artist' as const },
];

const savedAlbums = [
    { id: 'sa1', imageUrl: 'https://picsum.photos/seed/album-standbyme/150/150', title: 'Stand By Me Doraemon OST', subtitle: 'Movie Soundtrack', type: 'Album' as const },
    { id: 'sa2', imageUrl: 'https://picsum.photos/seed/album-spaceheroes/150/150', title: 'Space Heroes Adventure', subtitle: 'Epic Themes', type: 'Album' as const },
];


const LibraryPage: React.FC = () => {
  console.log('LibraryPage loaded');
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
      durationSeconds: 240 // Placeholder
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
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/library/playlists" className={navigationMenuTriggerStyle()}>Playlists</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/library/artists" className={navigationMenuTriggerStyle()}>Artists</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/library/albums" className={navigationMenuTriggerStyle()}>Albums</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>
        <ScrollArea className="flex-1 p-6 pb-28">
          <ThemedSectionHeader title="Your Music Library" subtitle="All your saved tunes and artists" themeColorClass="bg-purple-100 border-purple-500"/>
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="songs">Liked Songs</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
            </TabsList>
            <TabsContent value="playlists">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {userPlaylists.map(playlist => (
                  <MediaCard key={playlist.id} {...playlist} onPlay={() => playMedia(playlist)} onClick={() => console.log('Playlist clicked:', playlist.id)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="songs">
              <div className="space-y-2">
                {likedSongs.map(song => (
                  <SongListItem
                    key={song.id}
                    song={song}
                    onPlay={() => playSong(song)}
                    isCurrentTrack={currentSong?.title === song.title && currentSong?.artist === song.artist}
                    isPlaying={currentSong?.title === song.title && currentSong?.artist === song.artist && isPlaying}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="artists">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {followedArtists.map(artist => (
                    <MediaCard key={artist.id} {...artist} onPlay={() => playMedia(artist)} onClick={() => console.log('Artist Clicked: ', artist.id)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {savedAlbums.map(album => (
                        <MediaCard key={album.id} {...album} onPlay={() => playMedia(album)} onClick={() => console.log('Album Clicked: ', album.id)} />
                    ))}
                </div>
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

export default LibraryPage;