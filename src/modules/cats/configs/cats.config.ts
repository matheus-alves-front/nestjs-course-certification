import { registerAs } from "@nestjs/config";

export default registerAs('cats', () => ({
  foo: 'bar',
  fuck: 'you'
}))