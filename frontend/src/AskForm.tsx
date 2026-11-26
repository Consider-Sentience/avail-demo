import { useState } from 'react';
import {
  Dropdown,
  EDGE_FUNCTION_URL,
  FieldLabel,
  ORGS,
  Segmented,
  SUPABASE_ANON_KEY,
  TRACKER_URL,
  apiOrgName,
  primaryBtn,
  wdth,
} from './shared';
import { MODELS } from './models';
import QuestionsField, { MAX_QUESTIONS } from './QuestionsField';
import CheckResults, { AssistantResult } from './CheckResults';
import { ORG_SPECIFIC_QUESTIONS, SAMPLE_QUESTIONS } from './samples';

const OTHER = "My organization isn't listed";

// One form for everything: one question runs a live check, a list (or a repeat
// schedule) saves a tracker and opens its report.
export default function AskForm() {
  const [orgChoice, setOrgChoice] = useState(ORGS[0]);
  const [customOrg, setCustomOrg] = useState('');
  const [domains, setDomains] = useState('');
  const [text, setText] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'weekly' | 'monthly'>('once');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AssistantResult[] | null>(null);

  const isOther = orgChoice === OTHER;
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const count = lines.length;
  const orgReady = isOther ? customOrg.trim() && domains.trim() : true;
  const ready = count > 0 && count <= MAX_QUESTIONS && !!orgReady && !busy;
  // The live check only knows the listed orgs' domains, so a custom org always goes through a tracker.
  const isLiveCheck = frequency === 'once' && count === 1 && !isOther;
  const showEmail = frequency !== 'once' || count > 1;
  const orgQuestion = isOther ? undefined : ORG_SPECIFIC_QUESTIONS[orgChoice];
  const samples = [...(orgQuestion ? [orgQuestion] : []), ...SAMPLE_QUESTIONS];

  async function submit() {
    setBusy(true);
    setError(null);
    setResults(null);
    try {
      if (isLiveCheck) {
        const res = await fetch(EDGE_FUNCTION_URL, {
          method: 'POST',
          headers: { 'content-type': 'application/json', Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
          body: JSON.stringify({
            orgName: isOther ? customOrg.trim() : apiOrgName(orgChoice),
            question: lines[0].slice(0, 280),
          }),
        });
        const data = await res.json();
        if (!res.ok) setError(data.error || 'Something went wrong. Please try again.');
        else setResults(data.results);
        setBusy(false);
        return;
      }
      const res = await fetch(TRACKER_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({
          action: 'create',
          orgName: isOther ? customOrg.trim() : apiOrgName(orgChoice),
          domains: isOther ? domains.split(/[,\s]+/).filter(Boolean) : undefined,
          questions: lines,
          frequency,
          email: email.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setBusy(false);
        return;
      }
      window.location.assign(`/t/${data.token}`);
    } catch {
      setError("Couldn't reach the demo server. Please try again in a moment.");
      setBusy(false);
    }
  }

  const inputCls =
    'bg-white border border-solid border-slate/55 rounded h-[45px] w-full px-4 text-[15px] outline-none focus:border-rust';

  const buttonLabel = busy
    ? isLiveCheck
      ? 'Asking four AI assistants live…'
      : 'Setting up…'
    : frequency === 'once'
      ? 'Run check'
      : 'Start tracking';

  return (
    <>
      <p className="font-medium text-slate text-[16px] text-center tracking-[-0.08px] leading-[1.6] mb-4" style={wdth}>
        Pick an animal advocacy organization and add your questions. We’ll ask {MODELS.slice(0, -1).map((m) => m.short).join(', ')}, and{' '}
        {MODELS[MODELS.length - 1].short}, and check whether each answer cites that organization’s own website.
      </p>

      <div className="flex flex-col gap-3 items-start w-full">
        <div className="flex flex-col gap-1 w-full">
          <FieldLabel>Organization</FieldLabel>
          <p className="text-[13px] leading-[1.6] text-slate" style={wdth}>
            Choose the organization whose website we look for in each answer.
          </p>
        </div>
        <Dropdown value={orgChoice} options={[...ORGS, OTHER]} onSelect={setOrgChoice} />
        {isOther && (
          <div className="flex flex-col gap-2 w-full">
            <input
              className={inputCls}
              style={wdth}
              placeholder="Organization name"
              value={customOrg}
              maxLength={80}
              onChange={(e) => setCustomOrg(e.target.value)}
            />
            <input
              className={inputCls}
              style={wdth}
              placeholder="Your website domain(s), e.g. example.org"
              value={domains}
              onChange={(e) => setDomains(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="w-full mt-2">
        <QuestionsField text={text} setText={setText} samples={samples} />
      </div>

      <div className="flex flex-col gap-3 items-start w-full mt-2">
        <div className="flex flex-col gap-1 w-full">
          <FieldLabel>How often</FieldLabel>
          <p className="text-[13px] leading-[1.6] text-slate" style={wdth}>
            Once runs your questions now. Weekly or monthly runs them again on that schedule so you can see what changes.
          </p>
        </div>
        <Segmented
          size="secondary"
          value={frequency}
          onChange={setFrequency}
          options={[
            { value: 'once', label: 'once' },
            { value: 'weekly', label: 'weekly' },
            { value: 'monthly', label: 'monthly' },
          ]}
        />
      </div>

      {showEmail && (
        <div className="flex flex-col gap-3 items-start w-full mt-2">
          <div className="flex flex-col gap-1 w-full">
            <FieldLabel>
              Email <span className="normal-case font-normal text-slate/55 tracking-normal">(optional)</span>
            </FieldLabel>
            <p className="text-[13px] leading-[1.6] text-slate" style={wdth}>
              We’ll send you a link to your citation tracking report in the next few minutes
              {frequency === 'once' ? '.' : ', and a reminder to check it when it updates.'}
            </p>
          </div>
          <input
            className={inputCls}
            style={wdth}
            type="email"
            placeholder="you@example.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      )}

      <button type="button" onClick={submit} disabled={!ready} className={primaryBtn(!ready)} style={wdth}>
        {buttonLabel}
      </button>

      {error && (
        <div className="bg-status-fail-tint border border-status-fail/40 rounded-lg p-4 w-full text-status-fail text-[14px] text-center">
          {error}
        </div>
      )}

      {results && <CheckResults results={results} />}

      <div className="text-[12px] text-slate/55 text-center" style={wdth}>
        <p className="mb-0">
          NOTE: This demo checks for <span className="font-medium">direct citations</span> only, i.e. does the model
          cite the organization’s website in its response.
        </p>
        <p>It does not check for mentions of an organization’s name or indirect references to its work within responses.</p>
      </div>
      <p className="text-[12px] text-slate/55 text-center" style={wdth}>
        AVAIL is an experimental research preview by Consider Sentience. Free during the preview. Up to {MAX_QUESTIONS}{' '}
        questions per list. Lists and repeat checks get a private link to the results; anyone who has it can view them.
      </p>
    </>
  );
}
