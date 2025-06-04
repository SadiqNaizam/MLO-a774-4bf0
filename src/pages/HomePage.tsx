import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ThemedSectionHeader from '@/components/ThemedSectionHeader';
import Carousel from '@/components/Carousel';
import MediaCard from '@/components/MediaCard';
import PlayerControlsBar, { Song as PlayerSong } from '@/components/PlayerControlsBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';

const samplePlaylists = [
  { id: 'pl1', imageUrl: 'https://picsum.photos/seed/gadgetfunk/200/200', title: 'Gadget Grooves', subtitle: 'Funky beats for your inventions', type: 'Playlist' as const },
  { id: 'pl2', imageUrl: 'https://picsum.photos/seed/anywheredoor/200/200', title: 'Anywhere Door Jams', subtitle: 'Travel the world with sound', type: 'Playlist' as const },
  { id: 'pl3', imageUrl: 'https://picsum.photos/seed/timewarp/200/200', title: 'Time Warp Tunes', subtitle: 'Blast from the past', type: 'Playlist' as const },
  { id: 'pl4', imageUrl: 'https://picsum.photos/seed/futurefunk/200/200', title: 'Future Funk', subtitle: 'Sounds of tomorrow', type: 'Playlist' as const },
  { id: 'pl5', imageUrl: 'https://picsum.photos/seed/pocketpop/200/200', title: 'Pocketful of Pop', subtitle: 'Catchy tunes for everyone', type: 'Playlist' as const },
];

const sampleAlbums = [
  { id: 'al1', imageUrl: 'https://picsum.photos/seed/doraalbum1/200/200', title: 'Doraemon\'s Greatest Hits', subtitle: 'Classic Doraemon', type: 'Album' as const },
  { id: 'al2', imageUrl: 'https://picsum.photos/seed/nobitaalbum/200/200', title: 'Nobita\'s Study Beats', subtitle: 'Lo-fi for focus', type: 'Album' as const },
  { id: 'al3', imageUrl: 'https://picsum.photos/seed/shizukaalbum/200/200', title: 'Shizuka\'s Serenade', subtitle: 'Calm & Melodious', type: 'Album' as const },
  { id: 'al4', imageUrl: 'https://picsum.photos/seed/gianalbum/200/200', title: 'Gian\'s Power Ballads', subtitle: 'Loud and Proud', type: 'Album' as const },
  { id: 'al5', imageUrl: 'https://picsum.photos/seed/suneoalbum/200/200', title: 'Suneo\'s Smooth Jazz', subtitle: 'Cool and Classy', type: 'Album' as const },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');

  const [currentSong, setCurrentSong] = useState<PlayerSong | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const [volume, setVolume] = useState(50); // 0-100

  const handlePlayPause = () => {
    if (currentSong) setIsPlaying(!isPlaying);
    console.log('Play/Pause clicked');
  };
  const handleSkipNext = () => console.log('Skip Next clicked');
  const handleSkipPrevious = () => console.log('Skip Previous clicked');
  const handleSeek = (newProgress: number) => {
    setProgress(newProgress);
    console.log('Seek to:', newProgress);
  };
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    console.log('Volume changed to:', newVolume);
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
                <Link to="/home" className={navigationMenuTriggerStyle()}>
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/discover" className={navigationMenuTriggerStyle()}>
                  Discover
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/radio" className={navigationMenuTriggerStyle()}>
                  Radio
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>
        <ScrollArea className="flex-1 p-6 pb-28"> {/* pb-28 to ensure PlayerControlsBar doesn't overlap */}
          <ThemedSectionHeader title="Featured Playlists" subtitle="Curated just for you, Doraemon style!" themeColorClass="bg-blue-100 border-blue-500" />
          <Carousel>
            {samplePlaylists.map((playlist) => (
              <MediaCard
                key={playlist.id}
                {...playlist}
                onClick={() => console.log(`Navigate to playlist ${playlist.id}`)}
                onPlay={() => playMedia(playlist)}
              />
            ))}
          </Carousel>

          <ThemedSectionHeader title="New Releases" subtitle="Fresh tunes from the 22nd century!" themeColorClass="bg-yellow-100 border-yellow-500" />
          <Carousel>
            {sampleAlbums.map((album) => (
              <MediaCard
                key={album.id}
                {...album}
                onClick={() => console.log(`Navigate to album ${album.id}`)}
                onPlay={() => playMedia(album)}
              />
            ))}
          </Carousel>

           <ThemedSectionHeader title="Recently Played" subtitle="Your recent adventures in sound" themeColorClass="bg-green-100 border-green-500" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {sampleAlbums.slice(0,5).map(album => (
                     <MediaCard
                        key={`recent-${album.id}`}
                        {...album}
                        onClick={() => console.log(`Navigate to album ${album.id}`)}
                        onPlay={() => playMedia(album)}
                    />
                ))}
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

export default HomePage;