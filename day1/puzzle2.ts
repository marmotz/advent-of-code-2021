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
    let previous1 = null;
    let previous2 = null;
    let previous3 = null;
    let count = 0;

    for await (const line of file) {
      if (previous1 && previous2 && previous3) {
        if (parseInt(line) + previous1 + previous2 > previous1 + previous2 + previous3) {
          count++;
        }
      }

      previous3 = previous2;
      previous2 = previous1;
      previous1 = parseInt(line);
    }

    return count;
  }
}

Puzzle.main(__dirname + '/data.txt');
