'use client';

import React from 'react';
import Link from 'next/link';

import {
  EnvelopeClosedIcon,
  FileTextIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  ClockIcon,
} from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import TextScroll from './components/TextScroll';

interface SocialLink {
  social: string; // If I want to add it as text
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Footer = () => {
  const socialLinks: SocialLink[] = [
    {
      social: 'Github',
      href: 'https://github.com/jesusthecreator017',
      icon: GitHubLogoIcon,
    },
    {
      social: 'Linkedin',
      href: 'https://www.linkedin.com/in/jesusg107/',
      icon: LinkedInLogoIcon,
    },
    {
      social: 'Instagram',
      href: 'https://www.instagram.com/jesus.gon16/',
      icon: InstagramLogoIcon,
    },
    {
      social: 'Gmail',
      href: 'mailto:jesus.r.gonzalez@gmail.com',
      icon: EnvelopeClosedIcon,
    },
  ];
  return (
    <footer className="bg-background flex justify-center p-5">
      <div className="bg-card flex max-w-fit items-center justify-between space-x-4 rounded-2xl border px-6 py-3">
        {/* Left Side - Hidden on mobile, visible on tablet+ */}
        <div className="hidden items-center space-x-4 md:flex">
          <p>© Jesus Rey Gonzalez</p>
          <p>-</p>
          <Badge className="flex gap-1" variant="outline">
            <ClockIcon />
            <p>01/07/2006</p>
          </Badge>
          <Separator orientation="vertical" />
        </div>

        {/* Middle - Hidden on mobile/tablet, visible on laptop+ */}
        <div className="hidden items-center space-x-4 lg:flex">
          <TextScroll />
          <Separator orientation="vertical" />
        </div>

        {/* Social Links - Always visible */}
        <div className="flex items-center space-x-4">
          {socialLinks.map((links) => (
            <Link
              key={links.social}
              href={links.href}
              target="_blank"
              rel="noopener nonreferrer"
            >
              <links.icon className="h-6 w-6 transition hover:scale-110" />
            </Link>
          ))}
          <a href="apps/blade/public/Jesus_Gonzalez_2025_V2.pdf" download>
            <FileTextIcon className="h-6 w-6 transition hover:scale-110" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
