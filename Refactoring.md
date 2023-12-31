# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

My goal in refactoring the code was to increase readability. I did so by doing the following:
1. By initializing candidate with TRIVIAL_PARTITION_KEY. This removes this check:
else {
    candidate = TRIVIAL_PARTITION_KEY;
}
2. I used the nullish coalescing operator on event.partitionKey to remove this section:
if (event.partitionKey) {
    candidate = event.partitionKey;
}
3. I removed the need for the data variable because it was only used once and inserted it directly in the update function:
const data = JSON.stringify(event);
4. I used the ternary operator to reduce the number of lines and to make the return more readable in my opinion.
