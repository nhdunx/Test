// Danh sách các header nên xóa
const headersToRemove = [
  'X-RevenueCat-ETag',
  'X-RevenueCat-Request-Time',
  'X-RevenueCat-User-Agent',
  'Authorization',
  'User-Agent',
  'Accept-Language'
];

// Hàm set giá trị header
function setHeaderValue(e, a, d) {
  var r = a.toLowerCase();
  r in e ? e[r] = d : e[a] = d;
}

// Lấy headers hiện tại
var modifiedHeaders = $request.headers;

// Xóa các header không cần thiết
for (let header of headersToRemove) {
  if (modifiedHeaders[header]) {
    delete modifiedHeaders[header];
  }
}

// Set giá trị cho header 'X-RevenueCat-ETag'
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");

// Trả lại các headers đã sửa
$done({ headers: modifiedHeaders });
