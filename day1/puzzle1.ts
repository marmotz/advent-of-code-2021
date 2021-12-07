import * as fs from 'fs';
import * as readline from 'readline';
import { FileHandle, open } from 'fs/promises';
import { createReadStream, ReadStream } from 'fs';
import { Interface } from 'readline';

class Puzzle1 {
  public static main(filePath: string): void {
    const puzzle = new Puzzle1(filePath)
    puzzle.run();
  }

  constructor(private filePath: string) {
  }

  async run(): Promise<void> {
    const file = this.openFile();
    console.log(`Result: ${await Puzzle1.solve(file)}`);
  }

  private openFile(): Interface {
    return readline.createInterface({
      input: createReadStream(this.filePath),
      crlfDelay: Infinity
    });
  }

  private static async solve(file: Interface): Promise<number> {
    let previous;
    let count = 0;

    for await (const line of file) {
      if (previous) {
        if (parseInt(line) > previous) {
          count++;
        }
      }

      previous = parseInt(line);
    }

    return count;
  }
}

Puzzle1.main(__dirname + '/data.txt');
