// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const calculateExercises = (exercises: Array<number>, target: number) => {
    const periodlength: number = exercises.length;
    const daysTrained:Array<number> = exercises.filter(e => e > 0);
    const trainingDays: number = daysTrained.length;
    const exerciseHours: number = exercises.reduce((a,b) => a + b);
    const average: number = exerciseHours / trainingDays;
    const success: boolean = (average > target);
    
    if (target === -1) {
        return ('Enter valid inputs');
    }

    let rating: number;

    if (average === 0) {
        rating = 1;
    } else if (average < target) {
        rating = 2;
    } else {
        rating = 3;
    }

    let ratingDescribtion;
    if (rating == 1) {
        ratingDescribtion = 'You missed that week completely';
    } else if (rating === 2) {
        ratingDescribtion = 'Just a bit more';
    } else if (rating === 3) {
        ratingDescribtion = 'Very well done';
    }

    const data = {
        "periodlength": periodlength,
        "trainingDays": trainingDays,
        "success": success,
        "rating": rating,
        "ratingDescribtion": ratingDescribtion,
        "target": target,
        "average": average
    };

    return data;

};

const target: number = Number(process.argv[2]) || -1;
const ex: Array<number> = [Number(process.argv[3]) || 0, Number(process.argv[4]) || 0, Number(process.argv[5]) || 0, Number(process.argv[6]) || 0, Number(process.argv[7]) || 0, Number(process.argv[8]) || 0, Number(process.argv[9]) || 0];

console.log(calculateExercises(ex, target));