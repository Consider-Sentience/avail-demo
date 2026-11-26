import {
  AccordionRow,
  FindingCard,
  ModelsTable,
  bodyCls,
  findingBodyCls,
  findingCls,
  surface,
  sectionCls,
  sectionTitleCls,
  wdth,
} from "./shared";

// Section order matches the credibility section's layout exactly (same padding, same full-width text),
// so line lengths and left edges line up across the page.
// Numbers come from our test in data/ (60 questions x 4 assistants x 2 runs = 480 answers).

export function SectionTitle({
  lead,
  accent,
  tail,
}: {
  lead: string;
  accent: string;
  tail?: string;
}) {
  return (
    <p className={sectionTitleCls} style={wdth}>
      {lead} <span className="font-medium text-rust">{accent}</span>
      {tail ? ` ${tail}` : ""}
    </p>
  );
}

export function ModelsSection() {
  return (
    <section className={sectionCls}>
      <div className="flex flex-col gap-3 w-full">
        <SectionTitle lead="Exactly which" accent="models" tail="we ask" />
        <p className={bodyCls} style={wdth}>
          Every check calls these model versions directly through their
          developer APIs, with web search turned on. We name them so results can
          be reproduced and compared. API results can differ from what you see
          in each company’s own app, and models are updated over time, so treat
          each result as a snapshot.
        </p>
      </div>
      <ModelsTable />
    </section>
  );
}

// General questions (no organization named): 100 answers per assistant.
// Share of answers that linked to any of the 10 organizations. Source: data/responses.csv.
const BY_ASSISTANT = [
  { name: 'Perplexity', cited: 48, total: 100 },
  { name: 'Claude', cited: 18, total: 100 },
  { name: 'Gemini', cited: 11, total: 100 },
  { name: 'ChatGPT', cited: 2, total: 100 },
];

function AssistantBars() {
  return (
    <figure className={`${surface} flex flex-col gap-4 p-6 w-full`}>
      <figcaption className="flex flex-col gap-1">
        <span className={findingCls} style={wdth}>It depends on the assistant</span>
        <span className={findingBodyCls} style={wdth}>
          When a question didn’t name an organization, the share of each assistant’s answers that linked to any of the 10 organizations
        </span>
      </figcaption>
      <ul className="flex flex-col gap-3 w-full">
        {BY_ASSISTANT.map((a) => {
          const pct = Math.round((a.cited / a.total) * 100);
          return (
            <li
              key={a.name}
              className="grid grid-cols-[88px_1fr_auto] md:grid-cols-[120px_1fr_56px] items-center gap-3"
              title={`${a.name}: ${a.cited} of ${a.total} answers (${pct}%)`}
            >
              <span className={findingBodyCls} style={wdth}>{a.name}</span>
              <span className="h-3 w-full rounded-[4px] bg-slate/10 overflow-hidden" aria-hidden="true">
                <span className="block h-full rounded-[4px] bg-rust" style={{ width: `${Math.max(pct, 1)}%` }} />
              </span>
              <span className={`${findingBodyCls} text-right whitespace-nowrap`} style={wdth}>
                <span className="font-medium">{pct}%</span>
              </span>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

export function WhySection() {
  return (
    <section className={sectionCls}>
      <div className="flex flex-col gap-3 w-full">
        <SectionTitle lead="Why this" accent="matters" />
        <p className={bodyCls} style={wdth}>
          More people now ask an AI assistant before they open a search engine.
          When an assistant answers a question about animals, the sources it
          cites decide whose expertise the reader sees, and whose gets skipped.
          Most organizations have never checked where they stand. We asked Claude, ChatGPT, Gemini, and Perplexity 60
          questions about animals, twice each, and checked whether the 480 answers linked to the websites of 10 animal
          advocacy organizations. Here is what we found:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <FindingCard
          context="When a question named the organization"
          stat="80% of answers"
          label="linked to that organization’s own website"
        />
        <FindingCard
          context="When a question didn’t name an organization"
          stat="20% of answers"
          label="linked to any of the 10 organizations"
        />
      </div>
      <AssistantBars />
      <a
        href="https://github.com/Consider-Sentience/avail-demo/tree/main/data"
        target="_blank"
        rel="noreferrer"
        className="-mt-2 mb-4 text-cloud text-[14px] underline hover:text-rust"
        style={wdth}
      >
        See the questions and results
      </a>

      <div className="flex flex-col gap-4 w-full">
        <AccordionRow title="What is answer engine optimization (AEO)?">
          <p>
            Search engine optimization (SEO) helps people find your website in a
            search engine. AEO is the same idea for AI assistants: understanding
            when they cite you, when they cite someone else, and what you can
            change. It is sometimes called generative engine optimization (GEO).
          </p>
        </AccordionRow>
        <AccordionRow title="Why should my organization care?">
          <p>
            A citation sends the reader to your work, credits your expertise,
            and builds trust in what you say. If an assistant answers a question
            in your area and cites a different source, your research and
            campaigns are invisible at the moment someone is deciding what to
            believe.
          </p>
          <p>
            Most organizations are not yet asking whether they are the top
            citation for the topics they work on. You can’t improve what you
            haven’t measured, and a baseline takes a few minutes.
          </p>
        </AccordionRow>
        <AccordionRow title="What can an organization do about it?">
          <p>
            Practitioners in this field suggest publishing original facts and
            statistics that AI answers can quote directly, and making your most
            useful pages easy to find. We have not tested cause and effect yet.
            AVAIL currently measures where you stand; suggested changes to your
            content are our next step.
          </p>
        </AccordionRow>
        <AccordionRow title="What does AVAIL measure, and what doesn’t it?">
          <p>
            AVAIL counts <span className="font-medium">direct citations</span>:
            an answer that links to your organization’s own website. It does not
            yet detect when you are named without a link, or when your work
            shapes an answer without credit.
          </p>
          <p>
            AI answers vary from run to run, so a single check is a snapshot.
            Tracking a question list over time shows what’s stable and what’s
            noise.
          </p>
        </AccordionRow>
      </div>
    </section>
  );
}
