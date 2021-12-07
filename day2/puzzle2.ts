import * as readline from 'readline';
import { createReadStream } from 'fs';
import { Interface } from 'readline';

class Puzzle {
  public static main(filePath: string): void {
    const puzzle = new Puzzle(filePath)
    puzzle.run();
  }

  constructor(private filePath: string) {
  }

  async run(): Promise<void> {
    const file = this.openFile();
    console.log(`Result: ${await Puzzle.solve(file)}`);
  }

  private openFile(): Interface {
    return readline.createInterface({
      input: createReadStream(this.filePath),
      crlfDelay: Infinity
    });
  }

  private static async solve(file: Interface): Promise<number> {
    let position = 0;
    let aim = 0;
    let depth = 0;

    for await (const line of file) {
      const [action, number] = line.split(' ');

      switch (action) {
        case 'forward':
          position += parseInt(number);
          depth += parseInt(number) * aim;
          break;

        case 'up':
          aim -= parseInt(number);
          break;

        case 'down':
          aim += parseInt(number);
          break;
      }
    }

    return position * depth;
  }
}

Puzzle.main(__dirname + '/data.txt');
