# ⏱️ JavaScript `setTimeout` and `setInterval` Tutorial

JavaScript provides two powerful functions to schedule code execution: `setTimeout` and `setInterval`. These functions allow you to delay actions or run code repeatedly at specific intervals.

---

## 🕐 `setTimeout`

### What it does
`setTimeout` runs a function **once** after a specified number of milliseconds.

### Syntax
```js
setTimeout(callback, delayInMilliseconds);
```

### Example
```js
function greet() {
  console.log("Hello after 2 seconds!");
}

setTimeout(greet, 2000); // 2000ms = 2 seconds
```

You can also use an anonymous function:
```js
setTimeout(() => {
  console.log("Hello with arrow function!");
}, 1000);
```

### Clearing a Timeout
You can cancel a timeout with `clearTimeout` if needed.

```js
const timeoutId = setTimeout(() => {
  console.log("This will never run!");
}, 3000);

clearTimeout(timeoutId);
```

---

## 🔁 `setInterval`

### What it does
`setInterval` runs a function **repeatedly** at a specified time interval.

### Syntax
```js
setInterval(callback, intervalInMilliseconds);
```

### Example
```js
function count() {
  console.log("Counting every second!");
}

setInterval(count, 1000);
```

### Clearing an Interval
Use `clearInterval` to stop the repeating function.

```js
let counter = 0;

const intervalId = setInterval(() => {
  counter++;
  console.log(`Counter: ${counter}`);

  if (counter === 5) {
    clearInterval(intervalId);
    console.log("Stopped counting.");
  }
}, 1000);
```

---

## 🧠 Key Differences

| Feature        | `setTimeout`     | `setInterval`   |
|----------------|------------------|-----------------|
| Runs once?     | ✅ Yes           | ❌ No           |
| Runs repeatedly? | ❌ No           | ✅ Yes          |
| Can be canceled? | ✅ Yes (`clearTimeout`) | ✅ Yes (`clearInterval`) |

---

## ✅ Use Cases

- `setTimeout`
  - Delayed effect start
  - Triggering a single note after a delay
- `setInterval`
  - Updating a clock
  - Looping Patterns
  - Making a transport
