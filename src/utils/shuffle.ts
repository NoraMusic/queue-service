export default function shuffleArray(array: unknown[]): unknown[] {
	let arrayLength: number = array.length;
	let randomIndex: number;
	let temp: unknown;

	while (arrayLength) {
		randomIndex = Math.floor(Math.random() * arrayLength--);
		temp = array[arrayLength];
		array[arrayLength] = array[randomIndex];
		array[randomIndex] = temp;
	}
	return array;
}
