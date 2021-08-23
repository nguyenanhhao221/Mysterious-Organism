// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
}
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand;
}

//Object
const pAequorFactory = (number,array) => {
    return {
        specimenNum: number,
        dna: array,

        // Mutate the DNA, randomly selecting a base in the object’s dna property and changing the current base to a different base. Then .mutate() will return the object’s dna.
        // For example, if the randomly selected base is the 1st base and it is 'A', the base must be changed to 'T', 'C', or 'G'. But it cannot be 'A' again.
        mutate() {
            let index = Math.floor(Math.random() * 15);
            let newBase = returnRandBase();
            while (this.dna[index] === newBase) {
                newBase = returnRandBase();
            };
            this.dna[index] = newBase;

            return this.dna;
        },

        //compare the current pAequor‘s .dna with the passed in pAequor‘s .dna and compute how many bases are identical and in the same locations. .compareDNA() does not return anything, but prints a message that states the percentage of DNA the two objects have in common — use the .specimenNum to identify which pAequor objects are being compared.

        compareDNA(obj) {
            let similar = 0;
            for (let i = 0; i < (this.dna).length; i++) {
                if (this.dna[i] === obj.dna[i]){
                    similar++;
                }
            }
            let percent = (similar / (this.dna).length) * 100;

            console.log(`specimen #${this.specimenNum} and specimen #${obj.specimenNum} have ${percent}% DNA in common`); 
        },

        // returns true if the object’s .dna array contains at least 60% 'C' or 'G' bases. Otherwise, .willLikelySurvive() returns false.
        willLikelySurvive() {
            let occurrenceOfC = 0;
            let occurrenceOfG = 0;
            for (let base of this.dna) {
                if (base === 'C') {
                    occurrenceOfC++;
                }
                if (base === 'G') {
                    occurrenceOfG++;
                }
            }

            let percentOfC = occurrenceOfC / this.dna.length * 100;
            let percentOfG = occurrenceOfG / this.dna.length * 100;
            if (percentOfC >= 60 || percentOfG >= 60) {
                return true;
            } else {
                return false;
            }
        },

        //function to create a complementary DNA Strand
        complementStrand() {
            let compDNA = []
            for (let item of this.dna) {
                switch (item) {
                    case 'A':
                        compDNA.push('T');
                        break;
                    case 'T':
                        compDNA.push('A');
                        break;
                    case 'C':
                        compDNA.push('G');
                        break;
                    case 'G':
                        compDNA.push('C');
                        break;
                }
            }
            return compDNA;
        },
    }
};

// Log an array contains 30 samples of DNA that legit survice (C or G more than 60%)
let finalArr =[];

while(finalArr.length < 30) {
    let testDNA = pAequorFactory(1,mockUpStrand());
    if (testDNA.willLikelySurvive() === true) {
        finalArr.push(testDNA.dna);
    }
}
console.log(finalArr);

const firstDNA = pAequorFactory(1,mockUpStrand());
console.log(firstDNA.dna);
console.log(firstDNA.complementStrand());

//Test git