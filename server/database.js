import { readFile, writeFile } from 'fs/promises';
import { MongoClient, ServerApiVersion } from 'mongodb';

class Database {
  constructor(dburl) {
    this.dburl = dburl
    this.connect(); 
  }
  
  async connect() {
    this.client = await MongoClient.connect(this.dburl, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    this.db = this.client.db('database');
    await this.init();
  }
  async init(){
    this.word = this.db.collection('word')
    this.game = this.db.collection('game')
  }
  async close(){
    this.client.close();
  }
  async saveWordScore(name, word, score) {
    const document = { name, word, score };
    const res = await this.word.insertOne(document);
  }
  async saveGameScore(name, score) {
    const document = { name, score };
    const res = await this.game.insertOne(document);

  }
  async top10WordScores() {
    const res = await this.word.find({}).sort({ score: -1 }).limit(10).toArray(function(err, topDocuments) {
      if (err) throw err;
    });
    return res;
  }

  async top10GameScores() {
    const res = await this.game.find({}).sort({ score: -1 }).limit(10).toArray(function(err, topDocuments) {
      if (err) throw err;
    });
    return res;
    
  }

  async _read() {
    try {
      const data = await readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { word: [], game: [] };
    }
  }
  async _write(data) {
    await writeFile(this.path, JSON.stringify(data), 'utf8');
  }
}

const database = new Database("<database URI>");

export { database };
