import DitherPattern from '@/components/DitherPattern';

export default function Home() {
  return (
    <div className="w-screen h-screen relative flex items-center justify-center">
      <DitherPattern />

      <div className="relative z-10 max-w-[800px] px-10 text-left">
        <h1 className="text-5xl md:text-6xl font-normal mb-5 tracking-tighter">
          Ilia Alenabi
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-10 font-sans opacity-90">
          I'm a Computer Science student at university of Waterloo.
        </p>

        <div className="flex gap-8 flex-wrap">
          <a
            href="https://github.com/iliall"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg flex items-center gap-2 text-white no-underline transition-opacity duration-300 hover:opacity-70"
          >
            github
            <span className="inline-block rotate-[-45deg] border-white border-r-2 border-b-2 p-[3px] ml-[3px]" />
          </a>

          <a
            href="https://www.linkedin.com/in/ilia-alenabi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg flex items-center gap-2 text-white no-underline transition-opacity duration-300 hover:opacity-70"
          >
            linkedin
            <span className="inline-block rotate-[-45deg] border-white border-r-2 border-b-2 p-[3px] ml-[3px]" />
          </a>

          <a
            href="https://twitter.com/IliaAle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg flex items-center gap-2 text-white no-underline transition-opacity duration-300 hover:opacity-70"
          >
            X
            <span className="inline-block rotate-[-45deg] border-white border-r-2 border-b-2 p-[3px] ml-[3px]" />
          </a>

          <a
            href="mailto:ialenabi@uwaterloo.ca"
            className="text-lg flex items-center gap-2 text-white no-underline transition-opacity duration-300 hover:opacity-70"
          >
            email
            <span className="inline-block rotate-[-45deg] border-white border-r-2 border-b-2 p-[3px] ml-[3px]" />
          </a>
        </div>
      </div>
    </div>
  );
}
