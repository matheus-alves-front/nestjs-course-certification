import { CatRefactor1690429990971 } from "src/migrations/1690429990971-CatRefactor";
import { DataSource } from "typeorm";

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [],
  migrations: [CatRefactor1690429990971]
})