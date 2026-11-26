# AVAIL test data

The data behind the results on the AVAIL site: whether four AI assistants link to an animal advocacy organization's own website when answering questions about animals.

## What was asked

60 questions, in six categories of 10:

- **Ethics and rights, sentience and science, farming practice, diet and lifestyle (40 questions).** Real questions people posted on Stack Exchange and Wikipedia Reference Desk, taken from the open [Animal Welfare & Veganism Query Corpus](https://huggingface.co/datasets/considersentience/animal-welfare-veganism-query-corpus).
- **Organization-specific (10 questions).** Written by us, one per organization, such as "Does Animal Equality do undercover investigations?"
- **Certification and labeling (10 questions).** Written by us, such as "What does the Certified Humane label actually mean?"

Each question was sent to four assistants (Claude Sonnet 4.6, Perplexity Sonar, GPT-5.6 Sol and Gemini 3.7 Flash) through their developer APIs with web search on. The whole set was run twice (`run_1`, `run_2`), giving 480 answers.

## What was measured

Whether an answer cites a page on the organization's own website (a direct link). Named mentions without a link are not counted.

## Files

- `questions.json`: the 60 questions with their category, source and ID.
- `responses.csv`: one row per answer (run, question, category, assistant, model version, number of citations, and which of the ten organizations' domains were cited).
- `results.csv`: one row per organization: its website, the question that names it, and the two counts explained below, with percentages.

## Results

**Headline:** when a question named an organization, 64 of 80 answers (80%) linked to that organization's own website. When a question named no organization, 79 of 400 answers (20%) linked to any of the 10 organizations.

On those 400 general answers, it depended on the assistant (100 answers each):

| Assistant | Answers linking to any of the 10 organizations |
|---|---|
| Perplexity | 48 of 100 (48%) |
| Claude | 18 of 100 (18%) |
| Gemini | 11 of 100 (11%) |
| ChatGPT | 2 of 100 (2%) |

The test checked 10 animal advocacy organizations. For each one, it counted two things.

**1. When a question names the organization.** Each organization has one question about it (for example, "Does Animal Equality do undercover investigations?"). That question was asked to 4 assistants, twice, so it has 8 answers. We counted how many of those 8 answers link to the organization's own website.

**2. When a question doesn't name it.** The other 50 questions don't name any organization. Asked to 4 assistants twice, they have 400 answers. We counted how many of those 400 answers link to the organization's website.

| Organization | The question that names it | Answers to that question linking to its site | Answers to the other 50 questions linking to its site |
|---|---|---|---|
| Mercy For Animals | What does Mercy For Animals actually do? | 6 of 8 (75%) | 2 of 400 (0.5%) |
| PETA | Is PETA a legitimate charity or just a publicity stunt organization? | 6 of 8 (75%) | 30 of 400 (7.5%) |
| The Humane League | What's the difference between The Humane League and Mercy For Animals? | 5 of 8 (62.5%) | 6 of 400 (1.5%) |
| Animal Equality | Does Animal Equality do undercover investigations? | 8 of 8 (100%) | 3 of 400 (0.75%) |
| Compassion in World Farming | Is Compassion in World Farming a UK-only organization? | 7 of 8 (87.5%) | 5 of 400 (1.25%) |
| Farm Sanctuary | What has Farm Sanctuary accomplished for animal welfare? | 7 of 8 (87.5%) | 6 of 400 (1.5%) |
| Vegan Outreach | Is Vegan Outreach a good charity to donate to? | 6 of 8 (75%) | 0 of 400 (0%) |
| Faunalytics | What does Faunalytics research? | 8 of 8 (100%) | 13 of 400 (3.25%) |
| World Animal Protection | How is World Animal Protection different from PETA? | 5 of 8 (62.5%) | 7 of 400 (1.75%) |
| Humane Society International | Does Humane Society International work outside the US? | 6 of 8 (75%) | 25 of 400 (6.25%) |

Every organization's site was linked in at least 5 of the 8 answers that named it (62.5% or more, so "at least 6 in 10"). On the 400 answers that didn't name it, the most-linked organization was PETA at 30 of 400 (7.5%, so "fewer than 1 in 10").

To check any number: open `responses.csv`, filter `question_id` to the organization's question (from `questions.json`) for the first count, or to every category except `org_specific` for the second, and count the rows whose `org_domains_cited` include the organization's website.

API results can differ from what each company's own app shows, and models change over time, so each number is a snapshot.
