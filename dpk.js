const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = TRIVIAL_PARTITION_KEY;  //candidate starts off with the trivial partition key and gets updated if needed

  if (event) {
    candidate = event.partitionKey ?? crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    if (typeof candidate !== "string") { // candidate can be a type other than 'string' if it takes value from event.partionKey
      candidate = JSON.stringify(candidate);
    }
  }

  return (candidate.length > MAX_PARTITION_KEY_LENGTH) ? crypto.createHash("sha3-512").update(candidate).digest("hex") : candidate;
};


// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//   }
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };


