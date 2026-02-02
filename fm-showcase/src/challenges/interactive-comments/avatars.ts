// Avatar resimlerini import et
import imgAmyrobsonPng from './interactive-comments-images/avatar/image-amyrobson.png';
import imgMaxblagunPng from './interactive-comments-images/avatar/image-maxblagun.png';
import imgRamsesmironPng from './interactive-comments-images/avatar/image-ramsesmiron.png';
import imgJuliusomoPng from './interactive-comments-images/avatar/image-juliusomo.png';

// Avatar resimleri için merkezi tanım
export const avatars = {
  amyrobson: imgAmyrobsonPng,
  maxblagun: imgMaxblagunPng,
  ramsesmiron: imgRamsesmironPng,
  juliusomo: imgJuliusomoPng
} as const;

// Type-safe avatar keys
export type AvatarKey = keyof typeof avatars;