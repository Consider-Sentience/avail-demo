import { useEffect, useRef, useState } from 'react';
import { FieldLabel, smallBtn, wdth } from './shared';

export const MAX_QUESTIONS = 25;

// Minimal CSV reader: first column only, handles quoted fields, skips a header row.
export function parseCsvFirstColumn(text: string): string[] {
  const rows: string[] = [];
  let field = '';
  let inQuotes = false;
  let firstCol: string | null = null;
  const pushRow = () => {
    if (firstCol === null) firstCol = field;
    rows.push((firstCol ?? '').trim());
    field = '';
    firstCol = null;
  };
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ',') { if (firstCol === null) firstCol = field; field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      pushRow();
    } else field += ch;
  }
  if (field || firstCol !== null) pushRow();
  const cleaned = rows.filter(Boolean);
  if (cleaned.length && /^(questions?|prompts?)$/i.test(cleaned[0])) cleaned.shift();
  return cleaned;
}

export default function QuestionsField({
  text,
  setText,
  onDark = false,
  samples,
}: {
  text: string;
  setText: (t: string) => void;
  onDark?: boolean;
  samples?: string[];
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const count = text.split('\n').map((l) => l.trim()).filter(Boolean).length;
  const note = onDark ? 'text-cloud/70' : 'text-slate/55';
  const help = onDark ? 'text-cloud' : 'text-slate';
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const present = new Set(lines.map((l) => l.toLowerCase()));
  const remaining = (samples ?? []).filter((s) => !present.has(s.toLowerCase()));
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  function addSamples(toAdd: string[]) {
    setText([...lines, ...toAdd].slice(0, MAX_QUESTIONS).join('\n'));
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setText(parseCsvFirstColumn(String(reader.result ?? '')).join('\n'));
    reader.readAsText(f);
    e.target.value = '';
  }

  function downloadTemplate() {
    const csv = 'question\n"Is PETA a legitimate charity?"\n"Can insects feel pain?"\n';
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'avail-question-list-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-3 items-start w-full">
      <div className="flex flex-col gap-1 w-full">
      <FieldLabel>Questions</FieldLabel>
      <p className={`text-[13px] leading-[1.6] ${help}`} style={wdth}>
        Type up to {MAX_QUESTIONS} questions, one per line.{' '}
        {samples && samples.length > 0 ? 'You can also add questions from our samples, or upload a list as a CSV' : 'You can also upload a list as a CSV'}{' '}
        <span className="whitespace-nowrap">
          (<button type="button" className="underline hover:text-rust" onClick={downloadTemplate}>download the template</button>).
        </span>
      </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 w-full">
        <div className="flex items-center gap-2">
          {samples && samples.length > 0 && (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
                className={smallBtn}
                style={wdth}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-rust group-hover:text-cloud shrink-0" aria-hidden="true">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                add sample
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className={`shrink-0 ${menuOpen ? '-scale-y-100' : ''}`} aria-hidden="true">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {menuOpen && (
                <div
                  role="listbox"
                  className="absolute left-0 top-full mt-1 z-20 w-[min(560px,calc(100vw-96px))] overflow-hidden rounded bg-white drop-shadow-[0px_0px_12px_rgba(0,0,0,0.2)]"
                >
                  {remaining.length === 0 && (
                    <p className="px-3 py-3 text-[15px] text-slate/55" style={wdth}>All sample questions added.</p>
                  )}
                  {remaining.map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="option"
                      aria-selected={false}
                      onClick={() => addSamples([s])}
                      className="flex w-full items-start gap-3 px-3 py-3 text-left bg-white hover:bg-cloud"
                    >
                      <span className="mt-[2px] size-4 shrink-0 flex items-center justify-center text-rust">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className="text-[15px] leading-[1.4] text-black" style={wdth}>
                        {s}
                      </span>
                    </button>
                  ))}
                  {remaining.length > 1 && (
                    <button
                      type="button"
                      onClick={() => addSamples(remaining)}
                      className="flex w-full items-center gap-3 px-3 py-3 text-left border-t border-rust/40 bg-white hover:bg-cloud"
                    >
                      <span className="size-4 shrink-0 flex items-center justify-center text-rust">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className="text-[15px] text-black font-medium" style={wdth}>Add all</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
          <button type="button" onClick={() => fileRef.current?.click()} className={smallBtn} style={wdth}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-rust group-hover:text-cloud shrink-0" aria-hidden="true">
              <path d="M8 11V3M8 3L5 6M8 3l3 3M3 12v1h10v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            upload csv
          </button>
          <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={onFile} />
        </div>
      </div>
      <div className={`bg-white border border-solid rounded w-full p-4 ${text ? 'border-rust' : 'border-slate/55'}`}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing…"
          className="w-full h-[160px] resize-none border-none outline-none text-[15px] text-ink placeholder:text-slate/55 bg-transparent"
          style={wdth}
        />
      </div>
      <p
        className={`self-end text-[12px] ${count > MAX_QUESTIONS ? 'text-status-fail font-medium' : note}`}
        style={wdth}
      >
        {count} / {MAX_QUESTIONS}
      </p>
    </div>
  );
}
