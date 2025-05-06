const mapping = {
    'Locket': ['Gold']
};

var ua = $request.headers?.["User-Agent"] || $request.headers?.["user-agent"];
var obj;

try {
    obj = JSON.parse($response.body);
} catch (error) {
    console.error("Lỗi phân tích JSON:", error);
    obj = {};
}

// Thông tin thuê bao
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
obj.subscriber.entitlements = { Gold: entitlementInfo };
obj.subscriber.subscriptions = {
    "com.locket.gold.yearly": {
        ...entitlementInfo,
        original_purchase_date: "2024-01-01T00:00:00Z",
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

$done({ body: JSON.stringify(obj) });
