export function getRandomQuestion() {
    const firstNumber = Math.floor(Math.random() * 10);
    const secondNumber = Math.floor(Math.random() * 10);
    const operator = ['+', '-', '*', '/'].random();
    return `${firstNumber} ${operator} ${secondNumber}`;
}