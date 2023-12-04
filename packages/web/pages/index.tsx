import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import KeyButton from "../components/homepage/KeyButton";
import H2 from "../components/homepage/H2";
import Li from "../components/homepage/Li";
import ExampleCard from "../components/homepage/ExampleCard";
import Social from "../components/homepage/Social";
import Arrow from "../components/Arrow";
import CircleJar from "../components/homepage/CircleJar";
import Header from "../components/Header";
import Code from "../components/mdx/Code";

const WhiteGlove: NextPage = () => {
  return (
    <div className="bg-black">
      <Head>
        <title>Mailing – Add email to your React app</title>
        <meta property="og:title" content="Mailing" />
        <meta
          name="description"
          content="Build + test + send emails with React"
        />
        <meta
          name="keywords"
          content="email, email templates, transactional emails, react, javascript, typescript"
        />
        <meta property="og:url" content="https://mailing.run" />
        <meta property="og:image" content="https://mailing.run/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mailing" />
        <meta
          name="twitter:image"
          content="https://mailing.run/og-twitter.jpg"
        />
        <meta
          name="twitter:description"
          content="Build + test + send emails with React"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        rightButton={
          <>
            <div className="flex-1 text-right hidden lg:inline-block">
              <KeyButton small href="/docs#getting-started">
                Get Started
                <Arrow />
              </KeyButton>
            </div>
            <Link
              href="/docs#getting-started"
              className="lg:hidden text-blue-400 flex-1 text-right"
            >
              Start
              <Arrow />
            </Link>
          </>
        }
      />
      <main className="px-5 sm:px-16 xl:px-0 bg-black min-h-screen text-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto xl:px-8 text-left sm:text-center">
          <h1 className="text-[84px] sm:text-8xl md:text-[108px] lg:text-[140px] font-serif font-bold text-white  mt-24 leading-[0.9] max-w-[840px] mx-auto">
            Add email to your React app
          </h1>
          <div className="text-lg sm:text-2xl md:text-3xl mt-8 max-w-2xl mx-auto leading-[1.4]">
            An open source tool for developing and sending compatible,
            consistent emails from any app
          </div>
        </div>
        <Image
          src="/homepage/previewer-screenshot.png"
          width={1024}
          height={743}
          alt="Mailing previewer screenshot"
          className="mx-auto rounded-2xl border-2 border-gray-800 mt-12 sm:mt-20 md:mt-24"
          priority
        />
        <div className="mx-auto max-w-6xl">
          <H2>How it works</H2>
          <div className="sm:ml-16 xl:ml-36 2xl:ml-48">
            <Li
              title="Add Mailing to your app"
              description={
                <>
                  Mailing adds an <Code>emails</Code> directory to your Node
                  app. Email templates go in here and can import shared
                  constants, images, and components. Templates stay under source
                  control with the rest of your code.
                </>
              }
              index={1}
              prepend={<CircleJar index={0} />}
            />
            <Li
              title="Develop emails in React"
              description="Built-in MJML-React support means you can make templates compatible across email clients without thinking about table layout. The Mailing preview server gives you hot reload as you develop."
              index={2}
              prepend={<CircleJar index={1} />}
            />
            <Li
              title="Send with any transport"
              description={
                <>
                  Mailing is transport agnostic. The <Code>sendMail</Code>{" "}
                  function renders React MJML templates to HTML and sends them
                  to your mailing list subscribers. This function is built with
                  Nodemailer, so you can pass in any options that Nodemailer
                  supports.
                </>
              }
              index={3}
              prepend={<CircleJar index={2} />}
            />
          </div>
        </div>
        <div className="mx-auto lg:max-w-[1121px]">
          <div className="mx-auto max-w-5xl">
            <div className="flex sm:justify-center md:justify-end">
              <div className="text-left sm:text-center md:text-right max-w-[230px] sm:max-w-full lg:max-w-sm lg:mr-36 xl:mr-64">
                <H2 marginClassName="mt-36 sm:mt-40 md:mt-48 lg:mt-64 mb-12 sm:mb-[72px] md:mb-[84px] lg:mb-6">
                  Simple dev
                </H2>
              </div>
            </div>
          </div>
          <div className="relative mx-auto">
            <Image
              src="/homepage/fynn-code.png"
              width={1070 / 2}
              height={1092 / 2}
              alt="Fynn email screenshot with code"
              className="mx-auto rounded-l-2xl sm:hidden min-w-[143vw]"
            />
            <Image
              src="/homepage/fynn-code-sm.png"
              width={1280 / 2}
              height={1474 / 2}
              alt="Fynn email screenshot with code"
              className="mx-auto rounded-2xl hidden sm:block lg:hidden"
            />
            <Image
              src="/homepage/fynn-code-lg.png"
              width={2242 / 2}
              height={1362 / 2}
              alt="Fynn email screenshot with code"
              className="mx-auto rounded-2xl hidden lg:block"
            />
          </div>
          <div className="mx-auto max-w-5xl">
            <div className="flex justify-end">
              <div className="text-left lg:max-w-[442px] mt-10 sm:mt-12 md:mt-16 lg:mt-0">
                <h3 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.2]">
                  Collaborative
                </h3>
                <div className="text-lg md:text-xl mt-4 leading-[1.4]">
                  Self-host previews on Vercel to keep your team on the same
                  page. Product and design folks can stay up-to-date with live
                  versions of emails and review PR previews in development.
                </div>
              </div>
            </div>
            <div className="text-left lg:max-w-[442px] mt-10 sm:mt-12 md:mt-16 lg:mt-0">
              <h3 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.2]">
                Open source
              </h3>
              <div className="text-lg md:text-xl mt-4 leading-[1.4]">
                Mailing is open source tool because we want to build software
                that outlasts our company. We love to get regular input and
                contributions from the community. Need a feature? Open an issue.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="text-left lg:max-w-[442px] mt-10 sm:mt-12 md:mt-16 lg:mt-0">
                <h3 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.2]">
                  Zero lock-in
                </h3>
                <div className="text-lg md:text-xl mt-4 leading-[1.4]">
                  The Mailing dev environment and nodemailer{" "}
                  <Code>sendMail</Code> proxy are free. If you want to send with
                  another system, export the preview HTML or use the React
                  templates with the <Code>render</Code> function.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black flex mx-auto flex-col text-center container">
          <H2>Demo templates</H2>
          <div className="text-left flex flex-wrap justify-center">
            <ExampleCard name="lancey" />
            <ExampleCard name="mailing" />
            <ExampleCard name="bbeam" />
            <ExampleCard name="fynn" />
            <ExampleCard name="thoughtfulPost" />
            <ExampleCard name="bookBook" />
          </div>
        </div>
        <div className="flex justify-center md:gap-12 xl:gap-16 items-center mt-16 sm:mt-24">
          <Image
            src="/homepage/demo-theme.png"
            width={440}
            height={600}
            alt="Mailing demo theme"
            className="rounded-2xl hidden md:block lg:hidden xl:block align-middle"
          />
          <Image
            src="/homepage/demo-theme-skinny.png"
            width={360}
            height={600}
            alt="Mailing demo theme"
            className="rounded-2xl hidden sm:block md:hidden lg:block xl:hidden  align-middle"
          />
          <div className="text-left sm:-ml-6 md:-ml-32">
            <h3 className="font-serif font-bold text-5xl md:text-[60px] lg:text-[72px]">
              Customize <br className="hidden sm:block md:hidden" /> a
              <br className="sm:hidden md:block" /> demo template
            </h3>
            <Image
              src="/homepage/demo-theme.png"
              width={440}
              height={600}
              alt="Mailing demo theme"
              className="rounded-2xl block sm:hidden mt-8"
            />
            <div className="text-lg lg:text-xl mt-8 sm:mt-4 md:mt-8 w-full sm:max-w-md leading-[1.4]">
              Change a handful of constants to make any of these starter
              templates your own. If you need design system updates down the
              line, it’ll be easy to collaborate with designers and to keep your
              email and app experiences consistent.
            </div>
            <a
              href="https://github.com/sofn-xyz/mailing"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-400 text-2xl lg:text-3xl mt-6 md:mt-8 inline-block "
            >
              Get Started
              <span className="font-serif font-bold">&nbsp;&nbsp;→</span>
            </a>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto text-right flex justify-end xl:px-16">
          <div className="max-w-[788px]">
            <H2>Level up with Platform</H2>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto flex justify-between items-center gap-16 xl:px-16">
          <div className="">
            <h3 className="font-serif font-bold text-5xl md:text-[60px] lg:text-[72px]">
              Add a DB,
              <br className="hidden lg:block" />
              own your list
            </h3>
            <Image
              src="/homepage/list-screenshot.png"
              width={736}
              height={460}
              alt="Mailing list screenshot"
              className="rounded-lg border-2 border-gray-800 block lg:hidden my-8 w-full"
            ></Image>
            <div className="text-lg lg:text-xl mt-8 sm:mt-4 md:mt-8 max-w-full lg:max-w-md leading-[1.4]">
              Upgrade to Mailing Platform by adding a database. Every user that
              you <Code>sendMail</Code> to is saved to your audience. There’s no
              limit to the size of your audience.
            </div>
            <Link
              href="/docs/platform"
              className="underline hover:text-blue-400 text-2xl lg:text-3xl mt-6 md:mt-8 inline-block"
            >
              Learn More
              <span className="font-serif font-bold">&nbsp;&nbsp;→</span>
            </Link>
          </div>
          <Image
            src="/homepage/list-screenshot.png"
            width={736}
            height={460}
            alt="Mailing list screenshot"
            className="rounded-lg border-2 border-gray-800 hidden lg:flex justify-end lg:max-w-[600px] mr-0 lg:-mr-32 xl:mr-0 mt:0 lg:mt-12 xl:mt-0 xl:max-w-full"
          ></Image>
        </div>
        <div className="max-w-[1440px] mx-auto hidden lg:flex xl:hidden justify-between items-center gap-16 xl:px-16 mt-32">
          <div className="">
            <h3 className="font-serif font-bold text-5xl md:text-[60px] lg:text-[72px]">
              Give users <br className="hidden lg:block" />
              unsub prefs
            </h3>
            <Image
              src="/homepage/list-screenshot.png"
              width={736}
              height={460}
              alt="Mailing list screenshot"
              className="rounded-lg border-2 border-gray-800 block lg:hidden my-8 w-full"
            ></Image>
            <div className="text-lg lg:text-xl mt-8 sm:mt-4 md:mt-8 max-w-full lg:max-w-md leading-[1.4]">
              Drop-in unsubscribe links and subscription preferences give your
              users control of what email they receive. If you try to{" "}
              <Code>sendMail</Code> to an unsubscribed user, Mailing
              intelligently blocks the send.
            </div>
            <Link
              href="/docs/lists"
              className="underline hover:text-blue-400 text-2xl lg:text-3xl mt-6 md:mt-8 inline-block"
            >
              Learn More
              <span className="font-serif font-bold">&nbsp;&nbsp;→</span>
            </Link>
          </div>
          <Image
            src="/homepage/prefs-screenshot.png"
            width={736}
            height={460}
            alt="Mailing subscription preferences screenshot"
            className="rounded-lg border-2 border-gray-800 hidden lg:flex justify-end lg:max-w-[600px] mr-0 lg:-mr-32 xl:mr-0 mt:0 lg:mt-12 xl:mt-0 xl:max-w-full"
          ></Image>
        </div>
        <div className="max-w-[1440px] mx-auto flex lg:hidden xl:flex justify-between items-center gap-16 xl:px-16 mt-16 md:mt-20 lg:mt-32">
          <Image
            src="/homepage/prefs-screenshot.png"
            width={736}
            height={460}
            alt="Mailing subscription preferences screenshot"
            className="rounded-lg border-2 border-gray-800 hidden lg:flex justify-end lg:max-w-[600px] ml-0 lg:-ml-32 xl:ml-0 mt:0 lg:mt-12 xl:mt-0 xl:max-w-full"
          ></Image>
          <div className="">
            <h3 className="font-serif font-bold text-5xl md:text-[60px] lg:text-[72px]">
              Give users <br className="hidden lg:block" />
              unsub prefs
            </h3>
            <Image
              src="/homepage/prefs-screenshot.png"
              width={736}
              height={460}
              alt="Mailing subscription preferences screenshot"
              className="rounded-lg border-2 border-gray-800 block lg:hidden my-8 w-full"
            ></Image>
            <div className="text-lg lg:text-xl mt-8 sm:mt-4 md:mt-8 max-w-full lg:max-w-md leading-[1.4]">
              Drop-in unsubscribe links and subscription preferences give your
              users control of what email they receive. If you try to{" "}
              <Code>sendMail</Code> to an unsubscribed user, Mailing
              intelligently blocks the send.
            </div>
            <Link
              href="/docs/lists"
              className="underline hover:text-blue-400 text-2xl lg:text-3xl mt-6 md:mt-8 inline-block"
            >
              Learn More
              <span className="font-serif font-bold">&nbsp;&nbsp;→</span>
            </Link>
          </div>
        </div>

        <div className="mx-auto lg:max-w-6xl gap-x-[10%] lg:flex lg:flex-col lg:flex-wrap lg:max-h-[1530px] mt-36 sm:mt-40 md:mt-48 lg:mt-64">
          <div className="max-w-sm text-left sm:max-w-full sm:text-right lg:max-w-[45%] lg:text-left">
            <H2 marginClassName="">Kind words</H2>
          </div>
          <Social name="cymen" />
          <Social name="will" />
          <Social name="johan" />
          <Social name="steven" />
          <Social name="guillermo" />
          <Social name="sidi" />
        </div>
      </main>
      <footer className="bg-black flex justify-end mt-64 pb-24 mr-5 sm:mr-8 md:mr-16 xl:mr-24 2xl:mr-32">
        <Link href="/">
          <Image
            src="/mailing-icon-white.svg"
            alt="Mailing"
            width={21}
            height={28}
          />
        </Link>{" "}
      </footer>
      <style jsx>
        {`
          ul li:before {
            content: "●";
            padding-right: 12px;
            color: #444;
          }
          ul.platform li:before {
            color: #c3f2bc;
          }
        `}
      </style>
    </div>
  );
};

export default WhiteGlove;
