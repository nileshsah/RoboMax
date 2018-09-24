# *Robo*Max 🤖

Meet RoboMax! Your personal assistant for all your queries about the US election ¯\\_(ツ)_/¯

<p align="center">
  <img width="356" height="500" src="robomax-in-action.gif">
</p>


The Project
---
This repository contains self-sustained Jupyter notebooks used for training our assistant RoboMax to make it capable enough to answer open-domain questions. We use tweets as a source for our knowledge-base and attempt to reflect back the `opinion of the world` about your question of interest. At the moment, we've tweaked our RoboMax to answer questions about the 2016 US election from tweets gracefully made available at https://www.kaggle.com/kinguistics/election-day-tweets/#election_day_tweets.csv

Getting Started
---
The notebook [robomax-training-notebook.ipynb](robomax-training-notebook.ipynb) serves as the starting point for this project which constitutes of the major data exploration and feature engineering tasks. 

The notebook [robomax-election-tweets-bot.ipynb](robomax-election-tweets-bot.ipynb) involves tweaking RoboMax in order to answer questions based on election tweets.

Dataset
---
Due to the unavailability of a twitter based question-answer dataset, we resorted to using the pretty standard [SQuAD](https://rajpurkar.github.io/SQuAD-explorer/) reading comprehension dataset in a modified way. Instead of predicting the factual answers, we trained our model to identify the sentence containing the required answer.

Training
---
We built our model based on rather nominal features with a baseline Random Forest Classifier which leaves a huge scope for improvement. [AuC](https://en.wikipedia.org/wiki/Receiver_operating_characteristic) served as our metric to optimize due to the traditional class imbalance issue. We aimed to improve the recall for the sentences containing the correct answer over our prediction precision.

Prediction
---
We use a combination of indexing, predicting and summarizing to formulate an answer to the given question. [Whoosh](https://whoosh.readthedocs.io/en/latest/intro.html) serves as our go-to indexing library. Our pre-trained model generates scores for the results from the indexer in terms of which tweet is closest to the question followed by capping the best results using an Edmundson summarizer to finally bake up an answer.
