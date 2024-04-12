class Hash {
  constructor() {
    this.OffsetBasis32 = 2166136261;
    this.FNVPrime32 = 16777619;
    this.OffsetBasis64 = 14695981039346656037n;
    this.FNVPrime64 = 1099511628211n;
  }

  Hash32(str) {
    let data = Buffer.from(str, "ascii");
    let hash = this.OffsetBasis32;

    for (let i = 0; i < data.length; i++) {
      hash = hash ^ data[i];
      hash = (hash * this.FNVPrime32) >>> 0; // Use unsigned 32-bit integer
    }

    console.log(`${str}, ${hash}, ${hash.toString(16)}`);

    return hash;
  }

  Hash64(str) {
    let data = Buffer.from(str, "ascii");
    let hash = this.OffsetBasis64;

    for (let i = 0; i < data.length; i++) {
      hash = hash ^ BigInt(data[i]); // Use big int
      hash = hash * this.FNVPrime64;
    }

    console.log(`${str}, ${hash}, ${hash.toString(16)}`);

    return hash;
  }
}

const hash = new Hash();
hash.Hash32("this is Original Text");
hash.Hash64("this is Original Text");
