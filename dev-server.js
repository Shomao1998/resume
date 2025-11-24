const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const apiChatHandler = require('./api/chat');

const ROOT_DIR = __dirname;
const PORT = process.env.PORT || 3000;
const API_PATH = '/api/chat';

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif'
};

function sendResponse(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, headers);
  res.end(body);
}

async function handleApiChat(req, res) {
  let raw = '';

  req.on('data', (chunk) => {
    raw += chunk;
  });

  req.on('end', async () => {
    let payload = {};

    if (raw) {
      try {
        payload = JSON.parse(raw);
      } catch (error) {
        return sendResponse(
          res,
          400,
          JSON.stringify({ error: 'Invalid JSON body' }),
          {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        );
      }
    }

    try {
      const context = { log: console.log };
      await apiChatHandler(context, { body: payload });
      const { status = 200, body = {}, headers = {} } = context.res || {};

      sendResponse(
        res,
        status,
        JSON.stringify(body),
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          ...headers
        }
      );
    } catch (error) {
      console.error('API handler error:', error);
      sendResponse(
        res,
        500,
        JSON.stringify({ error: 'Unexpected server error' }),
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      );
    }
  });
}

function serveStatic(req, res) {
  const parsed = url.parse(req.url);
  const safePath = decodeURIComponent(parsed.pathname || '/');
  let targetPath = path.join(ROOT_DIR, safePath);

  try {
    const stats = fs.statSync(targetPath);
    if (stats.isDirectory()) {
      targetPath = path.join(targetPath, 'index.html');
    }
  } catch (error) {
    // If not found, fall back to index for client-side routing or 404
    if (safePath === '/' || safePath === '/index.html') {
      targetPath = path.join(ROOT_DIR, 'index.html');
    } else {
      return sendResponse(res, 404, 'Not Found');
    }
  }

  fs.readFile(targetPath, (err, data) => {
    if (err) {
      console.error('Failed to read file:', targetPath, err);
      return sendResponse(res, 500, 'Internal Server Error');
    }

    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    sendResponse(res, 200, data, { 'Content-Type': contentType });
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    return sendResponse(
      res,
      200,
      '',
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    );
  }

  if (req.method === 'POST' && req.url === API_PATH) {
    return handleApiChat(req, res);
  }

  return serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
