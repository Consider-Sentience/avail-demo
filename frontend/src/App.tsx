import {
  bodyCls,
  sectionCls,
  sectionTitleCls,
  SiteFooter,
  SiteHeader,
  Wordmark,
  secondaryBtn,
  wdth,
} from './shared';
import { ModelsSection, WhySection } from './Explainer';
import AskForm from './AskForm';
import TrackerPage from './TrackerPage';

// ---------- Home ----------

function HomePage() {
  return (
    <div className="bg-ink flex flex-col items-center w-full min-h-screen relative">
      <SiteHeader />

      {/* Hero — exact per-breakpoint values pulled from Figma nodes 1:229 (desktop), 1:280 (tablet), 1:331 (mobile) */}
      <section className="flex flex-col gap-[20px] md:gap-[24px] xl:gap-[64px] items-center pb-4 pt-[120px] xl:pt-[160px] px-[44px] md:px-[128px] xl:px-[256px] w-full">
        <Wordmark />

        <div className="flex flex-col gap-[20px] md:gap-[24px] xl:gap-[32px] items-start w-full">
          {/* One paragraph so every line break gets the same line-height (no per-line gaps) */}
          <h1
            className="text-[24px] md:text-[32px] xl:text-[40px] tracking-[0.24px] md:tracking-[0.32px] xl:tracking-[0.4px] leading-[1.4] uppercase w-full text-center text-cloud font-normal md:flex md:flex-col md:items-center"
            style={{ ...wdth, textWrap: 'balance' } as React.CSSProperties}
          >
            <span className="md:whitespace-nowrap">When people ask AI about animals,</span>{' '}
            <span className="md:whitespace-nowrap">
              <span className="text-rust font-medium">who</span> does it <span className="text-rust font-medium">cite</span>?
            </span>
          </h1>
          <div className="flex flex-col items-center w-full">
            <p
              className="text-cloud text-[17px] md:text-[18px] xl:text-[20px] text-center tracking-[-0.08px] md:tracking-[-0.09px] xl:tracking-[-0.1px] leading-[1.6] max-w-[768px]"
              style={wdth}
            >
              Millions of people are going straight to LLMs to ask questions about welfare, sentience,
              advocacy, and other topics related to non-human animals. But many of the answers they
              receive do not cite the wealth of information contained in resources from animal
              advocacy organizations. We want to change that.
            </p>
          </div>
        </div>
      </section>

      {/* Input panel */}
      <section className="flex flex-col items-center px-[24px] md:px-[94px] xl:px-[256px] py-8 w-full">
        <div className="bg-cloud border border-rust rounded-lg flex flex-col gap-6 items-center overflow-visible p-6 md:p-8 w-full max-w-[766px]">
          <AskForm />
        </div>
      </section>

      <ModelsSection />
      <WhySection />

      {/* "Where to start" section: same layout and type as Figma 1:262 */}
      <section className={sectionCls}>
        <div className="flex flex-col gap-3 w-full">
          <p className={sectionTitleCls} style={wdth}>
            Not sure where to <span className="font-medium text-rust">start</span>?
          </p>
          <p className={bodyCls} style={wdth}>
            Use our open dataset of real questions people ask about animals as a starting point for your own list.
            Our test of this tool used 60 questions: 40 from the dataset and 20 we wrote about specific organizations and labels.
            We asked each of four assistants every question, twice, for 480 answers in all.
          </p>
        </div>
        <a
          href="https://huggingface.co/datasets/considersentience/animal-welfare-veganism-query-corpus"
          target="_blank"
          rel="noreferrer"
          className={secondaryBtn}
          style={wdth}
        >
          see the open dataset
        </a>
      </section>

      {/* CTA section */}
      <section className="flex flex-col items-center px-[24px] md:px-[128px] xl:px-[256px] py-12 w-full">
        <div className="bg-rust border border-slate rounded-lg flex flex-col gap-6 items-start p-6 md:p-8 w-full max-w-[768px]">
          <div className="flex flex-col gap-3 text-white w-full">
            <p className="font-medium text-[16px] md:text-[20px] tracking-[0.32px] md:tracking-[0.4px] uppercase" style={wdth}>
              curious where your organization stands?
            </p>
            <p className="font-normal text-[14px] leading-[1.6]" style={wdth}>
              We believe it's important for people curious about non-human animals to get their
              information from trustworthy sources: impactful animal advocacy organizations. If
              that's you, it's time to start defining your answer engine optimization strategy.
            </p>
          </div>
          <a href="https://considersentience.ai" className={secondaryBtn} style={wdth}>
            learn more
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

// ---------- Router (no library: one extra route, /t/<token>) ----------

export default function App() {
  const m = window.location.pathname.match(/^\/t\/([a-f0-9]{32})\/?$/);
  return m ? <TrackerPage token={m[1]} /> : <HomePage />;
}
