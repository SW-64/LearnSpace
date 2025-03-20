import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`${port}번 포트에서 서버가 열렸습니다.`);
});
