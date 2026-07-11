/**
 * 朝の経済分析レポート - ダッシュボード機能
 * 自動更新、データ取得、チャート表示などの機能を提供
 */

class EconomicDashboard {
    constructor() {
        this.updateInterval = 5 * 60 * 1000; // 5分間隔で更新
        this.dataSources = {
            stock: 'https://api.example.com/stock-data',
            forex: 'https://api.example.com/forex-data',
            news: 'https://api.example.com/news-data'
        };
        this.init();
    }

    init() {
        this.updateDateTime();
        this.setupEventListeners();
        this.startAutoUpdate();
        this.loadInitialData();
    }

    // 日時更新
    updateDateTime() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        const dateElement = document.getElementById('currentDate');
        const updateElement = document.getElementById('lastUpdate');
        
        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString('ja-JP', options);
        }
        if (updateElement) {
            updateElement.textContent = now.toLocaleString('ja-JP');
        }
    }

    // イベントリスナー設定
    setupEventListeners() {
        const refreshBtn = document.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshData());
        }

        // キーボードショートカット
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                this.refreshData();
            }
        });
    }

    // 自動更新開始
    startAutoUpdate() {
        setInterval(() => {
            this.updateDateTime();
            this.loadMarketData();
        }, this.updateInterval);
    }

    // 初期データ読み込み
    async loadInitialData() {
        try {
            await this.loadMarketData();
            await this.loadNewsData();
        } catch (error) {
            console.error('初期データの読み込みに失敗しました:', error);
        }
    }

    // 市場データ読み込み
    async loadMarketData() {
        // 実際のAPI呼び出しの代わりに、モックデータを使用
        const mockData = {
            nikkei: {
                value: 33445.90,
                change: 98.50,
                changePercent: 0.30
            },
            usdjpy: {
                value: 149.85,
                change: 0.25,
                changePercent: 0.17
            },
            oil: {
                value: 78.45,
                change: -1.20,
                changePercent: -1.51
            },
            gold: {
                value: 2045.30,
                change: 12.50,
                changePercent: 0.61
            }
        };

        this.updateMetricCards(mockData);
    }

    // ニュースデータ読み込み
    async loadNewsData() {
        const mockNews = [
            {
                time: '09:30 JST',
                title: '日銀金融政策決定会合、政策金利据え置きを決定',
                content: '日本銀行は本日の金融政策決定会合で政策金利を現行の-0.1%に据え置くことを決定。市場予想通りでしたが、今後の政策変更の可能性について言及がありました。'
            },
            {
                time: '08:45 JST',
                title: '米国雇用統計、非農業部門雇用者数が予想を上回る',
                content: '12月の米国非農業部門雇用者数は前月比+216,000人増と市場予想の+170,000人を上回りました。失業率は3.7%で前月と同水準を維持。'
            }
        ];

        this.updateNewsSection(mockNews);
    }

    // メトリックカード更新
    updateMetricCards(data) {
        const cards = document.querySelectorAll('.metric-card');
        cards.forEach(card => {
            const title = card.querySelector('.metric-title').textContent;
            const valueElement = card.querySelector('.metric-value');
            const changeElement = card.querySelector('.metric-change');
            
            if (title.includes('日経平均') && data.nikkei) {
                this.updateCard(card, data.nikkei);
            } else if (title.includes('USD/JPY') && data.usdjpy) {
                this.updateCard(card, data.usdjpy);
            } else if (title.includes('WTI原油') && data.oil) {
                this.updateCard(card, data.oil);
            } else if (title.includes('金価格') && data.gold) {
                this.updateCard(card, data.gold);
            }
        });
    }

    // カード更新ヘルパー
    updateCard(card, data) {
        const valueElement = card.querySelector('.metric-value');
        const changeElement = card.querySelector('.metric-change');
        
        if (valueElement) {
            valueElement.textContent = data.value.toLocaleString();
        }
        
        if (changeElement) {
            const changeText = `${data.change >= 0 ? '+' : ''}${data.change} (${data.changePercent >= 0 ? '+' : ''}${data.changePercent}%)`;
            changeElement.textContent = changeText;
            changeElement.className = `metric-change ${data.change >= 0 ? 'positive' : 'negative'}`;
        }
        
        // 値の色を更新
        const valueClass = data.change >= 0 ? 'positive' : 'negative';
        valueElement.className = `metric-value ${valueClass}`;
    }

    // ニュースセクション更新
    updateNewsSection(newsData) {
        const newsSection = document.querySelector('.news-section');
        if (!newsSection) return;

        const newsContainer = newsSection.querySelector('.news-item')?.parentElement;
        if (!newsContainer) return;

        // 既存のニュースアイテムをクリア（最初のタイトル以外）
        const existingItems = newsContainer.querySelectorAll('.news-item');
        existingItems.forEach(item => item.remove());

        // 新しいニュースアイテムを追加
        newsData.forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <div class="news-time">${news.time}</div>
                <h4>${news.title}</h4>
                <p>${news.content}</p>
            `;
            newsContainer.appendChild(newsItem);
        });
    }

    // データ更新
    async refreshData() {
        const refreshBtn = document.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.textContent = '🔄 更新中...';
            refreshBtn.disabled = true;
        }

        try {
            await Promise.all([
                this.loadMarketData(),
                this.loadNewsData()
            ]);
            
            this.updateDateTime();
            
            if (refreshBtn) {
                refreshBtn.textContent = '🔄 データ更新';
                refreshBtn.disabled = false;
            }
            
            this.showNotification('データが更新されました！', 'success');
        } catch (error) {
            console.error('データ更新に失敗しました:', error);
            this.showNotification('データ更新に失敗しました', 'error');
            
            if (refreshBtn) {
                refreshBtn.textContent = '🔄 データ更新';
                refreshBtn.disabled = false;
            }
        }
    }

    // 通知表示
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.backgroundColor = '#27ae60';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#e74c3c';
        } else {
            notification.style.backgroundColor = '#3498db';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // ダッシュボード表示
    showDashboard() {
        this.showNotification('詳細ダッシュボード機能は準備中です。近日中に公開予定です。', 'info');
    }

    // チャート表示（将来の実装用）
    renderCharts() {
        // Chart.jsやD3.jsを使用したチャート表示機能
        // 現在はプレースホルダー
        console.log('チャート表示機能は準備中です');
    }

    // エクスポート機能
    exportReport(format = 'pdf') {
        this.showNotification(`${format.toUpperCase()}形式でのエクスポート機能は準備中です`, 'info');
    }
}

// ページ読み込み時にダッシュボードを初期化
document.addEventListener('DOMContentLoaded', function() {
    window.economicDashboard = new EconomicDashboard();
});

// グローバル関数として公開
window.refreshData = () => window.economicDashboard?.refreshData();
window.showDashboard = () => window.economicDashboard?.showDashboard();