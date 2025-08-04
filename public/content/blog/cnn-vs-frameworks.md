---
title: "My Handcrafted CNN vs Framework Models"
date: "2025-08-04"
excerpt: "I wanted to test if I could build a working CNN from scratch—one that could at least outperform the bottom half of a Kaggle leaderboard."
slug: "handcrafted-cnn"
---

<iframe src="https://www.kaggle.com/embed/jpvargas/handcrafted-cnn-learning-deep-learning-hard-way?kernelSessionId=253562111" height="800" style="margin: 0 auto; width: 100%; max-width: 950px;" frameborder="0" scrolling="auto" title="Handcrafted CNN: Learning Deep Learning Hard Way"></iframe>

---

## Why I Did This

I wanted to challenge myself by putting both my programming and AI knowledge into practice.  
Instead of relying on high-level frameworks or `model.fit()`, I built everything manually—from scratch.

The goal was clear:  
**Build a working convolutional neural network from the ground up**, capable of training on real data and participating in a Kaggle competition.

---

## The Setup

- **Python** as the main language  
- **Kaggle** for running experiments and documenting results  
- **NumPy** for all tensor and matrix operations  
- A fully custom CNN implementation, including:
  - Convolution
  - Pooling
  - Activation functions
  - Softmax
  - Cross-entropy loss
  - Manual backpropagation  
- **No use of PyTorch, TensorFlow, or scikit-learn**

---

## The Hardest Part

Without a doubt: **performance**.

Designing the architecture and implementing forward and backward passes was challenging, but the real bottleneck was the training process.

The dataset used (MNIST) contains over 42,000 training images, and my implementation was optimized for learning and understanding—not speed or GPU acceleration.

After nearly **9 hours of training**, my model reached **95% accuracy** using around half of the dataset (~20,000 samples). While this result is solid for a handcrafted neural network, it is considerably slower compared to modern frameworks running on GPU.

Despite that, I consider it a success. It was a valuable exercise in both theory and practice.

---

## What I Actually Built

- A **CNN from scratch**, fully functional
- Support for forward and backward propagation through convolutional and dense layers
- Implementation of:
  - L1 and L2 regularization
  - Dropout
  - Batch processing
  - Cross-entropy with softmax
  - Early stopping

---

## Key Results

- **Best accuracy**: `95.678%`  
- **Leaderboard Position**: `980 / 1112` (Kaggle - MNIST Digit Recognizer)

This may seem low compared to typical leaderboard results, but considering the model was built entirely from scratch without frameworks or GPU, I'm proud of what it achieved.

---

## What I Learned

- Manually implementing weight updates, activations, and gradients gave me a much deeper understanding of how neural networks actually work.
- Debugging and optimizing backpropagation helped clarify the role of each layer and operation in the learning process.
- Training a full model with only NumPy gave me perspective on what modern frameworks abstract—and why they are so valuable.

---

## What’s Next

I’m now shifting my focus toward:

- **OpenCV**, to deepen my understanding of computer vision fundamentals  
- **PyTorch**, to accelerate development and build more complex architectures  
- **Regular Kaggle participation**, with a goal of joining at least two competitions per month  

I’m also planning to experiment with **traditional computer vision pipelines using OpenCV filters**, and compare them with CNN-based approaches to better understand their tradeoffs.

---

## Why Share This?

To document my process, reflect on what I’ve learned, and hopefully help others going through a similar learning journey.

Publicly sharing progress is also a great way to stay motivated and grow through community feedback.

All of which helped broaden my understanding of both shallow and deep learning techniques.

---

Thank you for reading.

If you're considering building a neural network from scratch, my advice is:  
**Do it once. You’ll never look at machine learning frameworks the same way again.**
