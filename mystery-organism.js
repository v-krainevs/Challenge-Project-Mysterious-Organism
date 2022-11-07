// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Stores all existing specimenNum properties array in existingSpecimenNumbers variable
let existingSpecimenNumbers = [];

// Returns an object that contains the properties specimenNum and dna
const pAequorFactory = (specimenNum, dna) => {
  // Every time a function is called existingSpecimenNumbers array is checked on whether it already has provided specimenNum in it, if so user gets an error, otherwise function continues execution
  if (existingSpecimenNumbers.some((number) => number === specimenNum)) {
    return console.log(
      "A specimen with this number already exists, choose different number"
    );
  } else {
    existingSpecimenNumbers.push(specimenNum);
  }
  return {
    specimenNum,
    dna,

    // A mutate method which will return a new object's .dna array
    mutate() {
      // Picks a random number between 0 and 15 and assigns it to a randomIndex variable
      let randomIndex = Math.floor(Math.random() * 16);
      // Saves a current random DNA base to a previousBase variable
      let previousBase = this.dna[randomIndex];
      let newBase;
      // Assigns current random DNA base to a new random base and makes sure it's different from previous base
      do {
        newBase = returnRandBase();
        this.dna[randomIndex] = newBase;
      } while (this.dna[randomIndex] === previousBase);
      return this.dna;
    },

    // Compare this.dna with anotherObject.dna
    compareDNA(anotherObject) {
      // Identical bases in total
      let identicalTotal = 0;
      // Computes how many bases are identical and in the same locations in both objects. Each time a concurrence occurs, identicalTotal variable is increased by 1
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === anotherObject.dna[i]) {
          identicalTotal++;
        }
      }
      // Calculates the percentage of DNA the two objects have in common
      let commonDNAPercentage =
        Math.round((identicalTotal / 15) * 100 * 10) / 10;
      // console.log(
      //   `Specimen ${this.specimenNum} and ${anotherObject.specimenNum} have ${commonDNAPercentage}% DNA in common`
      // );
      let info = [
        commonDNAPercentage,
        this.specimenNum,
        anotherObject.specimenNum,
      ];
      return info;
    },

    // Returns true if the object’s .dna array contains at least 60% 'C' or 'G' bases. Otherwise, .willLikelySurvive() returns false.
    willLikelySurvive() {
      let CGTotal = 0;
      // Counts how many bases in total in object's .dna array are C or G
      for (let base of this.dna) {
        if (base === "C" || base === "G") {
          CGTotal++;
        }
      }
      // Calculates the percentage of C, G bases out of all
      let percentageOfCGBases = Math.round((CGTotal / 15) * 100 * 10) / 10;
      return percentageOfCGBases >= 60;
    },
    // Returns the complementary DNA strand.
    complementStrand() {
      let complementStrandArray = [];
      this.dna.map((base) => {
        switch (base) {
          case "A":
            complementStrandArray.push("T");
            break;
          case "T":
            complementStrandArray.push("A");
            break;
          case "C":
            complementStrandArray.push("G");
            break;
          case "G":
            complementStrandArray.push("C");
            break;
          default:
            console.log("You have provided a wrong base");
        }
      });
      return complementStrandArray;
    },
  };
};

// Stores all 30 instances of pAequor
let arrayOfPAequor = [];
for (i = 0; i < 30; i++) {
  arrayOfPAequor[i] = pAequorFactory(i, mockUpStrand());
}

// Stores 30 instances of pAequor that can survive in their natural environment
let strongPAequor = arrayOfPAequor.filter((element) =>
  element.willLikelySurvive()
);

// receives an array of arrays with 3 items inside(commonDNAPercentage, this.specimenNum and anotherObject.specimenNum)
let infoArray = [];
for (i = 0; i < arrayOfPAequor.length; i++) {
  for (j = 0; j < arrayOfPAequor.length; j++) {
    infoArray.push(arrayOfPAequor[i].compareDNA(arrayOfPAequor[j]));
  }
}

// Filters out cases when specimen is compared with itself
let realInfoArray = infoArray.filter((element) => element[1] !== element[2]);

// Sorts the array of arrays in decreasing order(highest commonDNAPercentage first)
realInfoArray.sort((a, b) => b[0] - a[0]);
let siblingDNA1 = realInfoArray[0][1];
let siblingDNA2 = realInfoArray[0][2];

console.log(
  arrayOfPAequor[siblingDNA1],
  arrayOfPAequor[siblingDNA2],
  arrayOfPAequor[siblingDNA1].compareDNA(arrayOfPAequor[siblingDNA2])
);
