import index from './index';

const port = process.env.PORT || 3000;
const port = process.env.PORT || 3000; // Ensure the default port is 3000 for Docker

const server = index.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default server;