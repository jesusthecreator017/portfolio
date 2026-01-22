import Image from 'next/image';

const Hero = () => {
  return (
    <section className="mx-auto flex max-w-5xl flex-row items-center gap-12 px-4 py-12 md:px-8 md:py-24">
      <div className="flex flex-col">
        <h1 className="font-mono text-3xl font-bold md:text-5xl md:whitespace-nowrap">
          Hey! I&apos;m
          <span className="text-primary block text-3xl font-bold whitespace-nowrap underline decoration-dashed md:inline md:pl-6 md:text-5xl">
            Jesus Gonzalez
          </span>
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-base italic md:text-xl">
          I&apos;m a sophomore at UCF studying to become a Full Stack Developer,
          but my curiosity runs deeper into low-level programming, game engines,
          and visual systems. I&apos;ve built a physics engine in C, pathfinding
          tools, and an issue tracker. My homelab keeps me grounded in IT
          fundamentals, and I&apos;m always looking for people to build with.
        </p>
      </div>
      <Image
        src="/JesusGonzalezHeadshot.jpg"
        alt="Jesus Gonzalez"
        width={256}
        height={256}
        className="hidden h-64 w-64 shrink-0 rounded-2xl object-cover lg:block"
      />
    </section>
  );
};

export default Hero;
