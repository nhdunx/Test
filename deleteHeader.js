// deleteHeader.js

// Danh sách các header nên xóa
const headersToRemove = [
  'X-RevenueCat-ETag',
  'X-RevenueCat-Request-Time',
  'X-RevenueCat-User-Agent',
  'Authorization',
  'User-Agent',
  'Accept-Language'
];

// Xóa các header đó khỏi request
for (let header of headersToRemove) {
  if ($request.headers[header]) {
    delete $request.headers[header];
  }
}

$done({ headers: $request.headers });
