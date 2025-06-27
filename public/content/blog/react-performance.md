---
title: "React Performance: Beyond useMemo and useCallback"
date: "2025-06-15"
excerpt: "Everyone talks about useMemo and useCallback, but there are deeper performance optimizations that can make a bigger impact on your React apps."
slug: "react-performance"
---

Everyone talks about `useMemo` and `useCallback` when discussing React performance. While these hooks are useful, they're often overused and miss the bigger picture.

### The Real Performance Killers

1. **Unnecessary re-renders** - Usually caused by poor component structure
2. **Heavy computations on every render** - Not just expensive calculations, but also object/array creation
3. **Poor state management** - Lifting state too high or not using context effectively

### Strategies That Actually Matter

#### 1. Component Structure
Instead of one giant component, break things down:

```jsx
// Bad - everything re-renders when count changes
function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  
  return (
    <div>
      <Counter count={count} setCount={setCount} />
      <ExpensiveUserList users={users} />
    </div>
  );
}

// Good - ExpensiveUserList won't re-render
function App() {
  return (
    <div>
      <CounterSection />
      <UserSection />
    </div>
  );
}
```

#### 2. React.memo with Custom Comparison
Don't just wrap everything in `React.memo`. Use custom comparison functions:

```jsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  // component logic
}, (prevProps, nextProps) => {
  // Custom comparison logic
  return prevProps.data.id === nextProps.data.id;
});
```

#### 3. Virtual Scrolling for Large Lists
For lists with hundreds or thousands of items, render only what's visible.

### The Profiler is Your Friend

Use React DevTools Profiler to identify actual bottlenecks. Don't optimize based on assumptions.

Performance optimization is about measuring first, then optimizing strategically.
