import Link from 'next/link';
import FlowField from '@/components/FlowField';
import { PostCard } from '@/components/PostCard';
import { Section } from '@/components/Section';
import { Chips, Kv, Project, Spec } from '@/components/blocks';
import { delay } from '@/lib/delay';
import { getPosts } from '@/lib/posts';

const LANGS = [
  'Python',
  'Go',
  'Rust',
  'TypeScript',
  'JavaScript',
  'C',
  'C++',
  'C#',
  'Swift',
  'Java',
  'SQL',
];

const GROUPS: [string, string[]][] = [
  [
    'Web',
    ['React', 'React Native', 'Next.js', 'tRPC', 'Drizzle', 'Tailwind', 'MobX'],
  ],
  [
    'Systems and embedded',
    ['Embassy', 'ESP32-S3', 'BLE', 'WebAssembly', 'wgpu'],
  ],
  ['Backend and tooling', ['WebSocket', 'Docker', 'Fly.io', 'Google OR-Tools']],
];

const btnGhost =
  'mono inline-flex min-h-12 items-center gap-2.5 border border-fg px-5 text-[.8125rem] font-medium tracking-[.03em] whitespace-nowrap transition duration-150 ease-ui hover:bg-fg hover:text-bg active:translate-y-px';

const xpRow =
  'hov rv -mx-3 grid gap-3 border-b border-line px-3 py-6 min-[800px]:grid-cols-[200px_1fr] min-[800px]:gap-8';

function XpWhen() {
  return (
    <div className="mono text-[.8125rem] leading-[1.6]">
      <b className="block font-semibold">Feb 2026 to Present</b>
      <span className="label">Current</span>
    </div>
  );
}

const xpTitle =
  'text-[1.375rem] leading-[1.2] font-semibold tracking-[-.015em]';

export default function Home() {
  const posts = getPosts().slice(0, 3);

  return (
    <main id="main">
      <section
        id="top"
        className="relative overflow-hidden pt-[clamp(40px,8vw,88px)] pb-[clamp(48px,8vw,96px)]"
      >
        <FlowField />
        <div className="relative z-[1] wrap grid items-end gap-10 min-[960px]:grid-cols-[7fr_5fr] min-[960px]:gap-16">
          <div>
            <p className="ld label" style={delay('.05s')}>
              Jesus Gonzalez, software engineering intern
            </p>
            <h1
              className="mt-[18px] mb-[22px] max-w-[16ch] ld text-[length:clamp(2.25rem,6.2vw,4.5rem)] leading-[1.04] font-semibold tracking-[-.03em] text-balance"
              style={delay('.15s')}
            >
              Full-stack and systems engineer building across web, embedded, and
              graphics.
              <span
                aria-hidden="true"
                className="ml-[.12em] inline-block h-[.78em] w-[.42em] animate-[blink_1.1s_steps(1)_8] bg-fg align-[-.04em] motion-reduce:animate-none"
              />
            </h1>
            <p className="max-w-[44ch] ld text-[1.125rem]" style={delay('.3s')}>
              Computer science student at UCF, expected July 2028. Currently
              interning at Florida&apos;s Turnpike Enterprise.
            </p>
            <div className="mt-7 flex ld flex-wrap gap-3" style={delay('.42s')}>
              <Link href="/#projects" className={btnGhost}>
                See projects <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
          </div>
          <aside
            aria-label="Summary"
            className="ld border border-line bg-bg/88"
            style={delay('.5s')}
          >
            <div className="flex justify-between gap-3 border-b border-line px-3.5 py-2.5 label">
              <span>Portfolio datasheet</span>
              <span>Software engineer</span>
            </div>
            <Kv
              rows={[
                ['Part', 'Jesus Gonzalez'],
                ['Family', 'Web, embedded, graphics'],
                ['Study', 'Computer Science, UCF'],
                ['Expected', 'July 2028'],
                [
                  'Now',
                  <>
                    <span
                      aria-hidden="true"
                      className="mr-2 inline-block size-2 bg-accent"
                    />
                    Florida&apos;s Turnpike Enterprise (FDOT) and Knight Hacks @
                    UCF
                  </>,
                ],
              ]}
            />
          </aside>
        </div>
        <p className="fig absolute right-[var(--gutter)] bottom-3.5 z-[2] m-0 max-w-[calc(100%-2*var(--gutter))] border border-hair bg-bg px-2 py-1 label">
          FIG.01 Flow field
          <span className="motion-reduce:hidden">, move cursor to perturb</span>
        </p>
      </section>

      <Section id="projects" n="01" title="Projects">
        <Project
          id="P-01"
          title="Volante"
          href="https://github.com/jesusthecreator017/Volante"
          lead="A racquet sensor pod with firmware written in Rust, a custom BLE data path, a stroke classifier, and a reinforcement learning arena that runs in the browser."
          specsClass="min-[800px]:grid-cols-3"
        >
          <Spec
            cols3
            label="Firmware"
            rows={[
              ['Language', 'Rust'],
              ['Runtime', 'Embassy'],
              ['MCU', 'ESP32-S3'],
              ['Form', 'Racquet sensor pod'],
            ]}
          />
          <Spec
            cols3
            label="Sensing"
            rows={[
              ['IMU rate', '500 Hz'],
              ['Link', 'Custom BLE'],
              ['Classifier', '10 strokes'],
            ]}
          />
          <Spec
            cols3
            label="Simulation"
            rows={[
              ['Training', 'PPO arena'],
              ['Renderer', 'wgpu'],
              ['Target', 'WebAssembly'],
            ]}
          />
        </Project>

        <div className="mt-5 grid gap-5 min-[900px]:grid-cols-[3fr_2fr]">
          <Project
            id="P-02"
            title="TermText"
            href="https://github.com/jesusthecreator017/TermText"
            lead="A real-time chat server in Go with end-to-end encrypted direct messages."
            className="flex flex-col"
            specsClass="flex-1 content-start"
            style={delay('.05s')}
          >
            <Spec
              rows={[
                ['Language', 'Go'],
                ['Transport', 'WebSocket hub'],
                ['DMs', 'End-to-end encrypted'],
                ['Image', '23 MB distroless Docker'],
                ['Host', 'Fly.io'],
              ]}
            />
          </Project>
          <Project
            id="P-03"
            title="DronePath"
            href="https://github.com/jesusthecreator017/knighthacks2025"
            lead="Multi-drone route planning built for Knight Hacks 2025. Team of 4."
            className="flex flex-col"
            specsClass="flex-1 content-start"
            style={delay('.1s')}
          >
            <Spec
              rows={[
                ['Result', '3rd of 188 teams'],
                ['Event', 'Knight Hacks 2025'],
                ['Solver', 'Google OR-Tools'],
                ['Problem', 'Multi-drone routing'],
              ]}
            />
          </Project>
        </div>
      </Section>

      <Section id="experience" n="02" title="Experience">
        <div className="rv border-t border-line">
          <article className={xpRow}>
            <XpWhen />
            <div>
              <h3 className={xpTitle}>Software Engineer Intern</h3>
              <p className="mt-1">
                Florida&apos;s Turnpike Enterprise (FDOT). Working on the
                SunPass platform, used by 3M+ daily users.
              </p>
              <Chips
                label="Stack"
                className="mt-3.5"
                items={[
                  'React',
                  'TypeScript',
                  'Tailwind',
                  'MobX',
                  'React Native',
                ]}
              />
            </div>
          </article>
          <article className={xpRow}>
            <XpWhen />
            <div>
              <h3 className={xpTitle}>Software Engineer</h3>
              <p className="mt-1">
                Knight Hacks @ UCF. Building Forge, a TypeScript monorepo.
              </p>
              <Chips
                label="Stack"
                className="mt-3.5"
                items={['TypeScript', 'Next.js', 'tRPC', 'Drizzle']}
              />
            </div>
          </article>
        </div>
      </Section>

      <Section id="skills" n="03" title="Skills">
        <div className="grid gap-9 min-[960px]:grid-cols-[7fr_5fr] min-[960px]:gap-14">
          <div className="rv">
            <h3 className="mb-3 label">Languages</h3>
            <ul className="grid grid-cols-2 border-t border-l border-line min-[560px]:grid-cols-3 min-[960px]:grid-cols-4">
              {LANGS.map((l, i) => (
                <li
                  key={l}
                  className="flex min-h-[92px] flex-col justify-between gap-3.5 border-r border-b border-line px-3.5 pt-3.5 pb-4 hov"
                >
                  <span className="label">
                    L{String(i + 1).padStart(2, '0')}
                  </span>
                  <b className="text-[1.1875rem] font-semibold tracking-[-.01em]">
                    {l}
                  </b>
                </li>
              ))}
              <li
                aria-hidden="true"
                className="flex min-h-[92px] flex-col justify-end gap-3.5 border-r border-b border-line bg-[repeating-linear-gradient(135deg,var(--hair)_0_1px,transparent_1px_9px)] px-3.5 pt-3.5 pb-4"
              >
                <b className="self-start bg-bg py-0.5 pr-1.5 mono text-[.8125rem] font-semibold">
                  {LANGS.length} total
                </b>
              </li>
            </ul>
          </div>
          <div className="rv grid content-start" style={delay('.08s')}>
            {GROUPS.map(([name, items]) => (
              <div
                key={name}
                className="border-t border-hair pt-[18px] pb-5 first:border-line"
              >
                <h3 className="label">{name}</h3>
                <Chips items={items} className="mt-2.5" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="about" n="04" title="About">
        <div className="grid gap-8 min-[960px]:grid-cols-[7fr_5fr] min-[960px]:items-start min-[960px]:gap-16">
          <div className="rv">
            {/* TODO(user): replace this placeholder About copy with your own text, then remove the tag. */}
            <span className="mb-3.5 inline-block border border-dashed border-line px-[9px] py-[5px] label">
              Placeholder copy
            </span>
            <p className="max-w-[58ch] text-[1.1875rem] leading-[1.6]">
              I study computer science at UCF and like working close to the
              hardware and close to the user: firmware in Rust, production web
              interfaces, and GPU rendering in the browser. Replace this block
              with two or three sentences in your own voice.
            </p>
          </div>
          <Kv
            className="rv border border-line bg-bg/88"
            style={delay('.08s')}
            rows={[
              ['Study', 'Computer Science, UCF'],
              ['Expected', 'July 2028'],
              ['Focus', 'Full-stack, systems, graphics'],
              ['Now', "Florida's Turnpike Enterprise and Knight Hacks @ UCF"],
            ]}
          />
        </div>
      </Section>

      <Section id="writing" n="05" title="Writing">
        {posts.length ? (
          <div className="grid gap-4 min-[900px]:grid-cols-[1.5fr_1fr_1fr]">
            {posts.map((p, i) => (
              <PostCard
                key={p.slug}
                as="h3"
                post={p}
                lead={i === 0}
                d={i ? `${i * 0.06}s` : undefined}
              />
            ))}
          </div>
        ) : (
          <p className="rv border border-line p-[22px]">No posts yet.</p>
        )}
        <Link
          href="/blog"
          className="rv mt-6 inline-flex min-h-11 items-center mono text-[.8125rem] underline underline-offset-4"
        >
          All writing -&gt;
        </Link>
      </Section>

      <Section id="contact" n="06" title="Contact">
        <div className="grid gap-10 min-[960px]:grid-cols-[7fr_5fr] min-[960px]:items-start min-[960px]:gap-16">
          <div className="rv">
            <a
              href="mailto:Jesus.R.Gonzalez107@gmail.com"
              className="inline-block text-[length:clamp(1.25rem,3.6vw,2.5rem)] leading-[1.2] font-semibold tracking-[-.02em] [overflow-wrap:anywhere] underline decoration-1 underline-offset-8 transition-[text-underline-offset,text-decoration-thickness] duration-200 ease-ui hover:decoration-2 hover:underline-offset-[12px]"
            >
              Jesus.R.Gonzalez107@gmail.com
            </a>
            <div className="mt-8">
              <a
                href="/resume.pdf"
                download
                className="inline-flex min-h-14 items-center justify-center gap-3 border border-fg bg-fg px-7 mono text-sm font-semibold tracking-[.03em] whitespace-nowrap text-bg transition duration-150 ease-ui hover:bg-bg hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg active:translate-y-px"
              >
                Download resume <span aria-hidden="true">+</span>
              </a>
            </div>
          </div>
          <div className="rv border-t border-line" style={delay('.08s')}>
            {[
              ['GitHub', 'github.com/jesusthecreator017'],
              ['LinkedIn', 'linkedin.com/in/jesusg107'],
            ].map(([name, text]) => (
              <a
                key={name}
                href={`https://${text}`}
                rel="noopener noreferrer"
                className="-mx-3 grid min-h-14 grid-cols-[96px_1fr_auto] items-center gap-3 border-b border-hair px-3 mono text-[.8125rem] [overflow-wrap:anywhere] hov"
              >
                <span className="label">{name}</span>
                <span>{text}</span>
                <span aria-hidden="true">-&gt;</span>
              </a>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
