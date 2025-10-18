---
title: "RLHF Workflow: From Reward Modeling to Online RLHF"
authors: ["Hanze Dong", "Wei Xiong", "Bo Pang", "Haoxiang Wang", "Han Zhao", "Yingbo Zhou", Nan Jiang, Doyen Sahoo, Caiming Xiong, Tong Zhang]
venue: "Transactions on Machine Learning Research (TMLR)"
year: 2024
featured: true
pdf: "https://openreview.net/pdf?id=a13aYUU9eU"
# tags: []
# highlights: []
# doi: ""
abstract: "We present the workflow of Online Iterative Reinforcement Learning from Human Feedback (RLHF) in this technical report, which is widely reported to outperform its offline counterpart by a large margin in the recent large language model (LLM) literature. However, existing open-source RLHF projects are still largely confined to the offline learning setting. In this technical report, we aim to fill in this gap and provide a detailed recipe that is easy to reproduce for online iterative RLHF. In particular, since online human feedback is usually infeasible for open-source communities with limited resources, we start by constructing preference models using a diverse set of open-source datasets and use the constructed proxy preference model to approximate human feedback. Then, we discuss the theoretical insights and algorithmic principles behind online iterative RLHF, followed by a detailed practical implementation. Our trained LLM achieves impressive performance on LLM chatbot benchmarks, including AlpacaEval-2, Arena-Hard, and MT-Bench, as well as other academic benchmarks such as HumanEval and TruthfulQA. We have shown that supervised fine-tuning (SFT) and iterative RLHF can obtain state-of-the-art performance with fully open-source datasets. Further, we have made our models, curated datasets, and comprehensive step-by-step code guidebooks publicly available."
bibtex: |
  @article{dong2024rlhf,
    title={Rlhf workflow: From reward modeling to online rlhf},
    author={Dong, Hanze and Xiong, Wei and Pang, Bo and Wang, Haoxiang and Zhao, Han and Zhou, Yingbo and Jiang, Nan and Sahoo, Doyen and Xiong, Caiming and Zhang, Tong},
    journal={arXiv preprint arXiv:2405.07863},
    year={2024}
  }
---

