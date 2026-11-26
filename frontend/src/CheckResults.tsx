import { Dot, STATUS, labelCls, wdth } from './shared';
import { modelByLabel } from './models';

export type AssistantResult = {
  assistant: string;
  status: 'ok' | 'unavailable';
  cited?: boolean;
  matchedUrl?: string | null;
  totalCitations?: number;
};

export default function CheckResults({ results }: { results: AssistantResult[] }) {
  return (
    <div className="flex flex-col gap-3 w-full">
          <p className={labelCls} style={wdth}>Results</p>
          <div className="bg-cloud border border-rust rounded-lg overflow-hidden w-full">
            <div className="hidden md:grid md:grid-cols-[1.3fr_1.1fr_1.6fr] md:gap-x-6 px-6 py-3 border-b border-rust">
              {['Assistant', 'Result', 'Source'].map((h) => (
                <p key={h} className={labelCls} style={wdth}>{h}</p>
              ))}
            </div>
            <div className="divide-y divide-rust/40">
              {results.map((r) => {
                const m = modelByLabel(r.assistant);
                const dot = r.status === 'unavailable' ? STATUS.neutral : r.cited ? STATUS.pass : STATUS.fail;
                const label =
                  r.status === 'unavailable' ? 'Temporarily unavailable' : r.cited ? 'Cited directly' : 'Not cited directly';
                return (
                  <div
                    key={r.assistant}
                    className="flex flex-col gap-2 px-4 md:px-6 py-4 md:grid md:grid-cols-[1.3fr_1.1fr_1.6fr] md:gap-x-6 md:items-start"
                  >
                    <div>
                      <p className="font-normal leading-[1.6] text-ink text-[15px]" style={wdth}>{m?.name ?? r.assistant}</p>
                      <p className="font-normal text-slate text-[12px] break-all" style={wdth}>{m?.modelId}</p>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <Dot color={dot} />
                      <span className="font-normal text-ink text-[14px]" style={wdth}>{label}</span>
                    </div>
                    <div className="min-w-0">
                      {r.status === 'ok' && r.cited && r.matchedUrl ? (
                        <a href={r.matchedUrl} target="_blank" rel="noreferrer" className="text-[12px] text-slate break-all underline hover:text-rust">
                          {r.matchedUrl}
                        </a>
                      ) : r.status === 'ok' ? (
                        <span className="text-slate text-[14px]" style={wdth}>
                          {r.totalCitations ?? 0} other source{r.totalCitations === 1 ? '' : 's'} cited
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
  );
}
