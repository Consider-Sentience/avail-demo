// General/topical questions only — none name a specific org, so any org
// selection produces a sensible result. Each has a confirmed real citation
// hit in our test.
export const SAMPLE_QUESTIONS = [
  'How can we end the suffering of all animals?',
  'Can insects feel pain?',
  'Are hogs scalded alive in slaughterhouses?',
  'Are farm raised fish unhealthier than their wild caught counterparts?',
  'What are the earliest advocates for animal rights and/or moral equivalency between killing animals vs. killing humans?',
  'Is it unethical or unprofessional to make a stand of some sort in the workplace regarding animal rights?',
];

// One question written specifically about each org, from our org-specific
// test questions. Shown first in the dropdown whenever that org is selected.
export const ORG_SPECIFIC_QUESTIONS: Record<string, string> = {
  'Animal Equality': 'Does Animal Equality do undercover investigations?',
  'Balanced': 'What does Balanced do to improve nutrition security?',
  'Compassion in World Farming': 'Is Compassion in World Farming a UK-only organization?',
  'Farm Sanctuary': 'What has Farm Sanctuary accomplished for animal welfare?',
  'Faunalytics': 'What does Faunalytics research?',
  'The Humane League': "What's the difference between The Humane League and Mercy For Animals?",
  'Humane Society International': 'Does Humane Society International work outside the US?',
  'Mercy for Animals': 'What does Mercy For Animals actually do?',
  'PETA': 'Is PETA a legitimate charity or just a publicity stunt organization?',
  'Vegan Outreach': 'Is Vegan Outreach a good charity to donate to?',
  'World Animal Protection': 'How is World Animal Protection different from PETA?',
};


// Look up an org's question regardless of capitalization ("Mercy For Animals" vs "Mercy for Animals").
export function orgQuestionFor(orgName: string): string | undefined {
  const key = Object.keys(ORG_SPECIFIC_QUESTIONS).find((k) => k.toLowerCase() === orgName.toLowerCase());
  return key ? ORG_SPECIFIC_QUESTIONS[key] : undefined;
}
