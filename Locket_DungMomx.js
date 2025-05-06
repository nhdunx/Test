const mapping = {
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

let entitlementInfo = {
  grace_period_expires_date: null,
  purchase_date: "2024-01-01T00:00:00Z",
  product_identifier: "com.locket.gold.yearly",
  expires_date: "2099-12-31T23:59:59Z",
  is_sandbox: false,
  unsubscribe_detected_at: null,
  billing_issues_detected_at: null,
  is_active: true
};

obj.subscriber = obj.subscriber || {};
obj.subscriber.entitlements = {
  Gold: entitlementInfo
};

obj.subscriber.subscriptions = {
  "com.locket.gold.yearly": {
    ...entitlementInfo,
    original_purchase_date: "2024-01-01T00:00:00Z",
    ownership_type: "PURCHASED",
    store: "app_store"
  }
};

// Các flag liên quan đến huy hiệu
obj.subscriber.profileBadge = "locket_gold_badge";
obj.subscriber.profileBadgeEnabled = true;
obj.subscriber.hasActiveBadges = true;
obj.subscriber.badgeCount = 1;

// Dự phòng các key phụ có thể bị kiểm tra
obj.subscriber.is_active = true;
obj.subscriber.goldMaxDuration = 120;
obj.subscriber.activeBadge = {
  name: "locket_gold_badge",
  displayName: "Gold Badge",
  isActive: true,
  isHidden: false
};
obj.subscriber.badges = [{
  name: "locket_gold_badge",
  displayName: "Gold Badge",
  isActive: true,
  isHidden: false
}];

$done({ body: JSON.stringify(obj) });

