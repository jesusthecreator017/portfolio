import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export interface Project {
  title: string;
  href: string;
  desc: string;
  stack: string[];
}

const ProjectCard = ({ title, href, desc, stack }: Project) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <Link className="cursor-pointer hover:underline" href={href}>
              {title}
            </Link>
          </CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-2">
          {stack.map((val, index) => (
            <Badge key={index} className="whitespace-nowrap">
              {val}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectCard;
