import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle } from 'lucide-react';

interface MediaCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  type?: 'Playlist' | 'Album' | 'Artist';
  onPlay?: () => void;
  onClick?: () => void;
}

const MediaCard: React.FC<MediaCardProps> = ({
  imageUrl,
  title,
  subtitle,
  type,
  onPlay,
  onClick,
}) => {
  console.log("Rendering MediaCard with title:", title);

  // Doraemon-blue hover state placeholder
  const hoverEffect = "group hover:shadow-lg hover:border-blue-500 transition-all duration-200";
  const playButtonHoverEffect = "group-hover:opacity-100 group-hover:translate-y-0";

  return (
    <Card
      className={`w-full max-w-[200px] m-2 overflow-hidden rounded-lg border ${hoverEffect} cursor-pointer`}
      onClick={onClick}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full rounded-t-lg"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlay && (
          <button
            onClick={(e) => { e.stopPropagation(); onPlay(); }}
            aria-label={`Play ${title}`}
            className={`absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-full shadow-md opacity-0 translate-y-2 transition-all duration-300 ${playButtonHoverEffect} focus:outline-none focus:ring-2 focus:ring-green-400`}
          >
            <PlayCircle size={24} />
          </button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle className="text-sm font-semibold truncate">{title}</CardTitle>
        {subtitle && <CardDescription className="text-xs truncate">{subtitle}</CardDescription>}
        {type && <p className="text-xs text-gray-500 mt-1">{type}</p>}
      </CardContent>
    </Card>
  );
}
export default MediaCard;