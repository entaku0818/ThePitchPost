export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

// トラッキングIDがある場合のみgtagを初期化
export const initGA = () => {
    if (GA_TRACKING_ID) {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA_TRACKING_ID);
    }
}

// ページビューを送信
export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
}

// イベントを送信
export const event = ({ action, category, label, value }) => {
    if (GA_TRACKING_ID) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
}
