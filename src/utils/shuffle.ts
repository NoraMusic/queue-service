export default function shuffleArray<T>(array: T[]): T[] {
	let arrayLength: number = array.length;
	let randomIndex: number;
	let temp: T;

	if (arrayLength < 2) return array;

	while (arrayLength) {
		randomIndex = Math.floor(Math.random() * arrayLength--);
		temp = array[arrayLength];
		array[arrayLength] = array[randomIndex];
		array[randomIndex] = temp;
	}
	return array;
}
