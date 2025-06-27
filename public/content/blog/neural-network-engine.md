---
title: "Why I Built My Own Neural Network Engine"
date: "2025-06-20"
excerpt: "Building my own neural network engine from scratch taught me more than any tutorial could. Here's what I learned..."
slug: "neural-network-engine"
---

I decided to build my own neural network engine using only TypeScript. No TensorFlow. No PyTorch. Just math, arrays, and headaches.

### Why?

Because I wanted to understand how backpropagation *really* works — not just theoretically, but line by line.

When you use high-level frameworks, you're abstracted away from the core mechanics. You call `model.fit()` and magic happens. But what exactly is happening?

### What I learned

- **Matrix operations are essential.** Everything in neural networks boils down to matrix multiplication and element-wise operations.
- **Debugging gradients manually builds intuition.** When you manually compute gradients and compare them to numerical gradients, you develop a deep understanding of what's happening.
- **Visualization makes training feel magical.** Watching loss curves decrease and seeing the model learn patterns in real-time never gets old.

### The Implementation

The core of my engine consists of just a few TypeScript classes:

- `Matrix` - handles all linear algebra operations
- `Layer` - represents a single neural network layer
- `Network` - orchestrates the forward and backward passes
- `Optimizer` - implements various optimization algorithms

### What's Next?

I'll open source it soon, and I'm already working on adding support for convolutional layers and better visual debugging tools.

The goal isn't to compete with existing frameworks, but to provide a learning tool that makes the black box transparent.

Stay tuned.
