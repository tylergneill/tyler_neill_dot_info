# Skrutable meter identification upgrades

## Background

If you’ve used Skrutable’s meter detection, perhaps even in its batch or “whole file” mode, you’ll know it has left lots to be desired in recent years:

- some confusing outputs talking about vague “asamīcīna” or “ajñāta” elements or “atha vā” alternatives    
- no good visual clues beyond concise plain-text scansion output  
- some annoying restrictions on input, such as one-verse-per-line file upload and no three-pada anuṣṭubh  
- some glaring shortcomings in identification of moraic meters (e.g., āryā)

In 2023, the peer project [Chandojñānam](https://sanskrit.iitk.ac.in/jnanasangraha/chanda/) by Hrishikesh Terdalkar and Arnab Bhattacharya leveled [interesting challenges](https://aclanthology.org/2023.wsc-csdh.8/) at Skrutable, referencing its own extra abilities in identification (e.g., imperfect ardhasamavṛtta), input (image-OCR with Google Drive), and output (tabular HTML, also for several verses). In my own [write-up](https://aclanthology.org/2023.wsc-csdh.7/) at the [same conference](https://aclanthology.org/volumes/2023.wsc-csdh/), I focused my own comparative thinking on Shreevatsa Rajagopalan’s [2018 write-up](https://gallium.inria.fr/~huet/PUBLIC/WSC2018.pdf) of his [Metre Identifier](https://sanskritmetres.appspot.com/) tool and the [2015 write-up](https://www.sanskritlibrary.org/pub/sktsynOffprintMelnadetal.pdf) of the [Meter Identifying Tool](http://sanskritlibrary.org:8080/MeterIdentification/) by Keshav Melnad, Pawan Goyal, and Peter Scharf. In the years since, I’ve tinkered with various aspects of Skrutable, and I periodically looked at Chandojñānam and Shreevatsa’s tool, including the latter’s [hidden “fulltext” mode](http://www.sanskritmetres.appspot.com/fulltext), and mulled over how to make Skrutable’s meter functionality better. Recently, Arun Prasad did a similar sort of HTML-output meter identification as part of his verification pipeline for [Ambuda](https://ambuda.org/).

misc\_screenshots/shreevatsa-fulltext.png

misc\_screenshots/chandojnanam-paper-fig-4.png

misc\_screenshots/ambuda-proofing-meter.png

Given my new 2026 AI superpowers with Claude, I figured it was time.

## Some Big Updates

I’m happy to report now that Skrutable’s meter identification capabilities have taken a huge leap forward. I’ve addressed basically all major aspects that I thought needed help. It is now clearer, more accurate, faster, and more fun to use, also at scale.

my\_project\_screenshots/skrutable-html-meter.png

Skrutable’s improved meter identification can now:

- identify many new types of imperfect verses, including even moraic verses;  
- give clear feedback pinpointing the location and nature of imperfections within the verse (e.g. missing or extra syllables, or pattern violations) to help improve the text  
- explain subtle rules and subrules in real time as they become relevant for a given verse, citing practical authorities in both Sanskrit and English  
- present output in various transliteration schemes  
- accept multi-verse input in naturally messy forms, in the main-screen input box

Most exciting of all, it offers an elaborate and video game-like graphical interface to browse all the verses of a text, analyze its verse types and subtypes, and work through correcting its textual problems.

my\_project\_screenshots/skrutable-bmcm.png

You just copy-paste your verse text into the box, ensure proper settings, and click Identify. Skrutable can now auto-transliterate, and it will also remember your preferred output scheme from previous sessions. In a few seconds, even large texts are completely analyzed, and accuracy and detail are both better than before. For example, you get pāda-by-pāda breakdown of various kinds of upajātis, even imperfect and less common ones. Moraic meters also now have some error tolerance, and for both moraic and anuṣṭubh meters, gaṇa groupings relevant to the meter type are shown. Skrutable even knows the “krama-saṃyoga” poetic license that allows for optionally counting a word-initial br or kr (for example) as a simple consonant when it helps the meter.

Now that the system is so much more powerful and fun to use, I’m really looking forward to using it for my own corpus-building work (HANSEL and Muktabodha). I hope it’ll be useful to you, too\! I’ll post a demo video if/when I make one, but meanwhile, go ahead and grab some text to try it out yourself.

## Next: Measuring Performance with the Mahāsubhāṣitasaṃgraha

Apart from a few dozen smaller items relating to meter identification still on the backlog, the main task remaining in this phase of development is to establish, in a rigorous and reproducible way, how well Skrutable's meter identification performs against a real benchmark. For that purpose, I've chosen Ludwig Sternbach's *Mahāsubhāṣitasaṃgraha*. It contains a wide range of meter types, including numerous unusual and defective specimens, making it an ideal test corpus. The resulting benchmark dataset would consist of (1) a unique verse identifier, (2) the verse text, and (3) a meter-identification annotation, including any known imperfections in the printed text. Once assembled, it will be usable not only for Skrutable but for any Sanskrit meter-identification tool.

First, it’s worth noting that the *Saṃgraha* itself is an incomplete and ongoing project, proceeding alphabetically and drawing on what appears to be a vast backlog of Sternbach's notes. There is no complete e-text. The first volume appeared in 1974 and covered अ–अन्वे. Four volumes were published before Sternbach's death in 1981, a fact discussed in the foreword to volume 5 (reaching का). These first five volumes were later digitized by unknown parties and eventually became the basis of the [GRETIL e-text](https://gretil.sub.uni-goettingen.de/gretil/corpustei/transformations/html/sa_mahAsubhASitasaMgraha-1-9979.htm), which remains the most comprehensive digital version available today. Volumes 6–8 (कि–छे) have also been available online for some time, e.g. [here on the Internet Archive](https://archive.org/details/MahaasubhaasitasamgrahaVol1-8). Most recently, volume 9 (ज–त) appeared in 2021\. I have a hard copy on loan from UPenn and plan to create a PDF version. It is remarkable that the team at the Vishveshvaranand Vedic Research Institute in Hoshiarpur has continued bringing the project forward for more than four decades after Sternbach's passing, though there is still a long way to go before reaching the end of the alphabet.

Given all that, building the benchmark is a substantial project in its own right. First, due to the fact the existing digital text covering volumes 1–5 contains many errors, I am effectively re-digitizing all nine volumes, though the existing e-text provides a significant head start for the earlier volumes. Second, the printed editions themselves contain numerous mistakes. Third, beyond digitizing the text, I want to utilize the metrical annotations supplied by the editors. Except in the case of anuṣṭubh, a meter label is typically given after each verse. Unfortunately, these labels are not always correct. Each volume also contains an "Index of Meters" grouping verses by meter type, but these indexes contain independent errors of their own and cannot be accepted uncritically.

There is an additional complication. In some cases, what Skrutable identifies as genuine metrical irregularities are not acknowledged in the printed edition at all, presumably because they are subtle enough to have escaped notice. At present, Skrutable appears accurate enough to serve as a useful source of hypotheses and a valuable cross-check against the editorial annotations. I am aware of the potential circularity involved in using a meter-identification system to help construct a benchmark against which meter-identification systems will later be evaluated. But where else will the ground truth come from? In practice, establishing these meter annotations will require corroborating the *Saṃgraha* against itself, against Skrutable, and against the best philological judgment I can bring to bear—hopefully with assistance from others as the project progresses.

The finished dataset, together with the complete e-text, will be released on HANSEL and should provide a valuable resource for future work on Sanskrit metrical analysis. More on that soon.