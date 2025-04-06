In the ever-expanding universe of software development methodologies, let’s comment on the latest hotness: vibe coding. Don’t think, just vibe. It’s what happens when you open your laptop with no real plan, fueled by caffeine, spite, and a vague sense of purpose. Case in point: my first(?) attempt to build a browser extension because I was sick of being distracted in our dopamine-addicted, digital culture.

The inspiration: loading up LinkedIn to go job searching, only to be immediately distracted by news items in the right hand bar. Do these articles really serve any purpose for the user or LinkedIn beyond generating clicks, boosting the cred of a randomized Greek Chorus, and/or baiting outrage on the topic du jour?

![LinkedIn home page with the news section removed.](/images/vibe_coding_linkedin_1.png)

There was no Jira ticket, no stakeholder meeting—just the collective groan of thousands of LinkedIn users wondering why we’re being force-fed “Top CEOs share their morning routines” every time we open a tab. What started as a joke became a surprisingly effective piece of micro-software. Turns out, when the vibes are right, the code writes itself.

## Preparation

Spoiler: I’m a nerd given to immediate action. When I got bit by the irritated bug, I lept into action instead of consulting my AI. I manually fired up my browser’s inspector and identified that the News component had clear identifying marks on its DOM div. Oops.

But all is not for naught\! At this point, I realized three important things:

1. I don’t think I’ve ever successfully created a browser extension beyond understanding it’s just a small HTML/JS web app that lives in the browser.
2. Generative AI is [pretty bad on a lot of topics](https://x.com/skdh/status/1905132853672784121), but it’s really [excellent at low-logic coding](https://news.ycombinator.com/item?id=43498338), especially static front-end work.
3. I hadn’t had a chance to unpack vibe coding despite some [famous examples of success](https://x.com/karpathy/status/1903837879937486912).

Since Andrej Karpathy (@karpathy) had good success with ChatGPT, I loaded that up and away I went.

## Coding

You can see all my prompts [here](https://chatgpt.com/share/67f001b5-6e7c-8001-b019-382334f6ca07). I left all code as-is in order to fully grok vibe coding.

Fascinating, the bulk of the time was not spent on the code, per se, but on areas around the code: how to deploy/share and issues around the extension icon. Repeating for those in the back: spending most of the time on deployment and design for a code project. Hmm. That never happens with 100% manually created code. Never.

Of course, if this were a larger project, I’d pay attention to some additional details, but for my purposes, this worked flawlessly as is, so I moved on. In the code, you’ll notice the selector logic looks a little wonky, and the timeout choice is very arbitrary. In a real world deployment, I’d monitor these “metrics” for a while upon initial release.

## Impact

![LinkedIn home page with the news section removed.](/images/vibe_coding_linkedin_2.png)

As you can see, this extension works flawlessly: the LinkedIn News section is gone, but everything else remains unmolested. It even leaves the ads, so LinkedIn gets paid for non-premium users\! I couldn’t be happier at how this turned out.

I do wish there was an easier way to share this code, but all-in-all, this has been a tremendous first step into AI-assisted coding where the AI assistant just smashes it. AI frequently gets it wrong–I’ve played two different AIs against each other with the same prompt, and both got the wrong answer. Long story short, don’t ask AIs about S3 events on a Glacier retrieval.

In this instance, score one for our robot overlords\!

## P.S.

Oh yeah, [I vibe coded the intro to this article](https://chatgpt.com/share/67f2a996-28c0-8001-bd4b-561c4a9c211b).
