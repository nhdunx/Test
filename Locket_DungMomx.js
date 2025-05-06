const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

// Thêm thông báo Attention vào phản hồi
obj.Attention = "UP TO NỖI HÀ DỤNG";

// Định nghĩa thông tin subscription và entitlement mặc định
var dunx = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2222-12-21T01:23:45Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "1945-09-02T14:00:00Z",
  purchase_date: "1945-09-02T14:00:00Z",
  store: "app_store"
};

var titkok = {
  grace_period_expires_date: null,
  purchase_date: "1945-09-02T14:00:00Z",
  product_identifier: "com.locket.gold.yearly",
  expires_date: "2222-12-21T01:23:45Z"
};

// Kiểm tra User-Agent và áp dụng entitlement và subscription tương ứng
const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
  let [e, s] = mapping[match];
  s ? (titkok.product_identifier = s, obj.subscriber.subscriptions[s] = dunx) : obj.subscriber.subscriptions["com.dunx.premium.yearly"] = dunx;
  obj.subscriber.entitlements[e] = titkok;
} else {
  obj.subscriber.subscriptions["com.locket.gold.yearly"] = dunx;
  obj.subscriber.entitlements.pro = titkok;
}

// Cập nhật các thông tin về Gold nếu User-Agent là Locket
if (ua.includes('Locket')) {
  let entitlementInfo = {
    grace_period_expires_date: null,
    purchase_date: "1945-09-02T14:00:00Z",
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
      original_purchase_date: "1945-09-02T00:00:00Z",
      ownership_type: "PURCHASED",
      store: "app_store"
    }
  };

  // Các flag và thông tin liên quan đến huy hiệu & Gold
  obj.subscriber.profileBadge = "locket_gold_badge";
  obj.subscriber.profileBadgeEnabled = true;
  obj.subscriber.hasActiveBadges = true;
  obj.subscriber.badgeCount = 1;
  obj.subscriber.goldMaxDuration = 120;
  obj.subscriber.is_active = true;

  obj.subscriber.activeBadge = {
    name: "locket_gold_badge",
    displayName: "Gold Badge",
    isActive: true,
    isHidden: false
  };

  obj.subscriber.badges = [
    {
      name: "locket_gold_badge",
      displayName: "Gold Badge",
      isActive: true,
      isHidden: false
    }
  ];

  // Bật các tính năng có thể kiểm tra ở client
  obj.subscriber.features = {
    showFreeTrialOffer: false,
    showDiscountOffer: false,
    showInviteButton: true,
    isLocketGoldUser: true,
    locketGoldBadge: true,
    locketGoldMainWithTweaks: true,
    LocketGoldOnePageFlow: true,
    DynamicLocketGoldFallbackView: true
  };

  // Đảm bảo mọi logic kiểm tra .is_active hay Gold đều đúng
  obj.subscriber.LocketGold = {
    isActive: true,
    membershipBadge: "locket_gold_badge",
    perks: ["no_ads", "unlimited_friends", "longer_videos"]
  };
}

$done({ body: JSON.stringify(obj) });
