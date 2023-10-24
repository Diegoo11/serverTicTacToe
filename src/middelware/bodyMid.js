const bodyMid = (req, res, next) => {
  if (req.method === 'GET') return next();
  let body = '';
  req.on('data', (chunck) => {
    body += chunck.toString();
  });

  req.on('end', () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    req.body = data;
    next();
  });
};

export default bodyMid;
