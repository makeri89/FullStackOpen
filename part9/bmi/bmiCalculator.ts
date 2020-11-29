// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const calculateBmi = (height: number, mass: number) => {
    const index = mass / ( (height / 100) ** 2);

    if (index < 15) {
        return ('Very severely underweight');
    } else if (index < 16) {
        return ('Severely underweight');
    } else if (index < 18.5) {
        return ('Underweight');
    } else if (index < 25) {
        return ('Normal (healthy weight)');
    } else if (index < 30) {
        return ('Overweight');
    } else if (index < 35) {
        return ('Obese class I (Moderately obese)');
    } else if (index < 40) {
        return ('Obese class II (Severely obese)');
    } else if (index >= 40) {
        return ('Obese class III (Very severely obese');
    } else {
        return ('Enter correct values');
    }
    return ('Something went wrong, try different parameters');
};

const height = Number(process.argv[2]);
const mass = Number(process.argv[3]);

console.log(calculateBmi(height, mass));