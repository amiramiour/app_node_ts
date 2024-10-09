import index from './index';

const port = process.env.PORT || 3000;

const server = index.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('tota');
});

export default server;